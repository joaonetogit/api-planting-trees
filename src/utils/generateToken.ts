import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { IUserPayload } from "../types/user";

dotenv.config();

export default function generateToken(payload: IUserPayload): string {
	return jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: "1h",
	});
}
