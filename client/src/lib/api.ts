import type { ApiType } from "@fullstack/server/src/index";
import { hc } from "hono/client";

export const client = hc<ApiType>("http://localhost:8080/");
