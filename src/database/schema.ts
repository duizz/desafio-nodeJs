import { pgTable, uuid, text, timestamp, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum('users_roles', [
    'student',
    'manager'
])

export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text()
})

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().unique().notNull(),
    password: text().notNull(),
    role: userRole().notNull().default('student')
})

export const enrollments = pgTable('enrollments', {
    id: uuid().primaryKey().notNull(),
    courseId: uuid().notNull().references(() => courses.id),
    userId: uuid().notNull().references(() => users.id),
    createAt: timestamp({ withTimezone: true }).notNull().defaultNow()
}, table => [
    uniqueIndex().on(table.userId, table.courseId)
])