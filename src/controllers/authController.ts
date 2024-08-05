import type { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import getUser from "../utils/getUser";
import httpStatusCodes from "../utils/httpStatusCode";

export default function authUser(req: Request, res: Response) {
	const { username, password } = req.body;
	const user = getUser(username, password);

	if (!user) {
		return res
			.status(httpStatusCodes.NOT_FOUND)
			.json({ message: "User not found" });
	}

	const token = generateToken(user);
	return res
		.status(httpStatusCodes.OK)
		.json({ message: "Login successful", token });
}
