import { fakerPT_BR } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";

export async function makeUser(){
    const result = await db.insert(users)
        .values({ 
            name: fakerPT_BR.person.fullName(),
            email: fakerPT_BR.internet.email() 
        })
        .returning()
    
    return result[0]
}