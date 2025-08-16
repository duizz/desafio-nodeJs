import { db } from "./client.ts"
import { courses, enrollments, users } from "./schema.ts"
import { fakerPT_BR } from '@faker-js/faker'

async function seed(){
    const usersInsert = await db.insert(users).values([
        { name: fakerPT_BR.person.fullName(), email: fakerPT_BR.internet.email() },
        { name: fakerPT_BR.person.fullName(), email: fakerPT_BR.internet.email() },
        { name: fakerPT_BR.person.fullName(), email: fakerPT_BR.internet.email() },
        { name: fakerPT_BR.person.fullName(), email: fakerPT_BR.internet.email() },
    ]).returning()

    const coursesInsert = await db.insert(courses).values([
        { title: fakerPT_BR.lorem.words(4), description: null },
        { title: fakerPT_BR.lorem.words(4), description: null },
        { title: fakerPT_BR.lorem.words(4), description: null },
    ]).returning()

    await db.insert(enrollments).values([
        { id: fakerPT_BR.string.uuid(), courseId: coursesInsert[0].id, userId: usersInsert[1].id },
        { id: fakerPT_BR.string.uuid(), courseId: coursesInsert[0].id, userId: usersInsert[2].id },
        { id: fakerPT_BR.string.uuid(), courseId: coursesInsert[1].id, userId: usersInsert[3].id },
    ])
}

seed();
