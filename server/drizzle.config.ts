import { defineConfig } from "drizzle-kit";
if (!process.env.DATABASE_URL) throw new Error("db url not provided");

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	strict: true,
});
