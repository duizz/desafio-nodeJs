import { db } from "../../database/client.ts";
import { enrollments } from "../../database/schema.ts";
import { randomUUID } from "node:crypto";

export async function makeEnrollments(courseId: string, userId: string){
    const result = await db.insert(enrollments)
        .values({
            id: randomUUID(),
            courseId,
            userId,
        }).returning()
        
    return result[0]
}