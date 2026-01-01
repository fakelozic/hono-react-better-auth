import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono({ strict: false });

app.use(logger());
app.use(
	"*",
	cors({
		origin: "http://localhost:5173",
		allowHeaders: [
			"Content-Type",
			"Authorization",
			"Upgrade-Insecure-Requests",
		],
		allowMethods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
		exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
		maxAge: 600,
		credentials: true,
	})
);

const apiRoute = app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.get("/api/people", (c) => {
		return c.json(
			[
				{ id: 1, name: "Alice" },
				{ id: 2, name: "Bob" },
				{ id: 3, name: "Charlie" },
			],
			200
		);
	});

export type ApiType = typeof apiRoute;

Bun.serve({
	port: 8080,
	fetch: app.fetch,
});

console.log();
