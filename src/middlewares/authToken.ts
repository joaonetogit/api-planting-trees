import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatusCodes from "../utils/httpStatusCode";

dotenv.config();

const codeJWTSecret = process.env.JWT_SECRET;

export default function authenticateToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res
			.status(httpStatusCodes.NOT_FOUND)
			.json({ message: "No token provided" });
	}

	const token = authorization.replace("Bearer ", "");

	if (!token) {
		return res
			.status(httpStatusCodes.UNAUTHORIZED)
			.json({ message: "Token unauthorized" });
	}

	try {
		jwt.verify(token, codeJWTSecret);
	} catch (error) {
		return res
			.status(httpStatusCodes.FORBIDDEN)
			.json({ message: "Invalid token" });
	}

	return next();
}
