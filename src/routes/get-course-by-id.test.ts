import supertest from "supertest";
import { test, expect } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-session.ts";

 test('get course by id', async () => {
    await server.ready()
    const course = await makeCourse();

    const { token } = await makeAuthenticatedUser('student')

    const response = await supertest(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token)

    
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null
        }
    })
 })

 test('return 404 for non existing course', async () => {
    await server.ready()
    const course = await makeCourse();

    const { token } = await makeAuthenticatedUser('student')

    const response = await supertest(server.server)
        .get(`/courses/855e4c37-9535-4e00-b566-620e87dcacf0`)
        .set('Authorization', token)

    
    expect(response.status).toEqual(400)
 })