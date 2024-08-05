import dotenv from "dotenv";

dotenv.config();

export default function getUser(username: string, password: string) {
	const adminUsername = process.env.SECRET_USER as string;
	const passRegistered = process.env.SECRET_PASS as string;

	if (username === adminUsername && password === passRegistered) {
		return { username: adminUsername, password: passRegistered };
	}

	return null;
}
