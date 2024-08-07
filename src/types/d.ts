declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			SECRET_USER: string;
			SECRET_PASS: string;
			JWT_SECRET: string;
			MONGODB_URI: string;
		}
	}
}

export type {};
