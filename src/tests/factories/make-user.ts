import { fakerPT_BR } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";

export async function makeUser(role?: 'manager' | 'student'){
    const passwordBeforeHash = randomUUID()

    const result = await db.insert(users)
        .values({ 
            name: fakerPT_BR.person.fullName(),
            email: fakerPT_BR.internet.email(),
            password: await hash(passwordBeforeHash),
            role
        })
        .returning()
    
    return {
        user: result[0],
        passwordBeforeHash
    }
}