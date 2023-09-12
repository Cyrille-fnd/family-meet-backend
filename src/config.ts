import dotenv from "dotenv";

dotenv.config();

export type Config = {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
}

declare const process: {
    env: {
        PORT: number;
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
    };
};

const getConfig = (): Config => ({
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});

export default getConfig
