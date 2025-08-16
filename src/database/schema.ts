import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text()
})

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().unique().notNull()
})

export const enrollments = pgTable('enrollments', {
    id: uuid().primaryKey().notNull(),
    courseId: uuid().notNull().references(() => courses.id),
    userId: uuid().notNull().references(() => users.id),
    createAt: timestamp({ withTimezone: true }).notNull().defaultNow()
}, table => [
    uniqueIndex().on(table.userId, table.courseId)
])