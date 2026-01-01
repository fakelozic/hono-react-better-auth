import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: varchar("title", { length: 512 }).notNull(),
	description: varchar("description", { length: 1024 }),
	isCompleted: boolean("is_completed").default(false),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});
