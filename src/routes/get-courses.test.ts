import supertest from "supertest";
import { test, expect } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";
import { makeEnrollments } from "../tests/factories/make-enrollments.ts";
import { makeUser } from "../tests/factories/make-user.ts";
import { db } from "../database/client.ts";
import { enrollments } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { makeAuthenticatedUser } from "../tests/factories/make-session.ts";

test('get all courses', async () => {
    await server.ready()

    const titleId = randomUUID()
    const course = await makeCourse(titleId);

    const { user } = await makeUser()
    const enrollmentsId = await makeEnrollments(course.id, user.id)

    const { token } = await makeAuthenticatedUser('manager')

    const response = await supertest(server.server)
        .get(`/courses?search=${titleId}&page=1`)
        .set('Authorization', token)

    const enrollmentsCount = await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.id, enrollmentsId.id))

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        total: 1,
        courses: [
            {
                id: expect.any(String),
                title: titleId,
                enrollments: enrollmentsCount.length
            }
        ]
    })
})