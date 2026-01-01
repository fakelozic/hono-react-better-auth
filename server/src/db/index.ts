import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const dbUrl = process.env.DATABASE_URL;
// "NODE_ENV" is the standard name, but "ENV" works if you set it manually
const env = process.env.NODE_ENV;

if (!dbUrl) throw new Error("db url not provided");

// Your logic is great here: Use your powerful RAM in dev, save resources in prod.
const maxConn = env === "development" ? 50 : 10;

// 1. Declare a global type so TypeScript doesn't complain
declare global {
	var _postgresClient: postgres.Sql | undefined;
}

let client;

if (env === "production") {
	// In production, just create the client normally
	client = postgres(dbUrl, { max: maxConn });
} else {
	// In development, check if we already have a client
	if (!globalThis._postgresClient) {
		globalThis._postgresClient = postgres(dbUrl, { max: maxConn });
	}
	client = globalThis._postgresClient;
}

// 2. Syntax Fix: Pass client as the first argument!
export const db = drizzle(client, { schema });
