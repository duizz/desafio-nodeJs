import { makeUser } from "./make-user.ts";
import jwt from 'jsonwebtoken'

export async function makeAuthenticatedUser(role: 'manager' | 'student') {
    const { user } = await makeUser(role)

    if(!process.env.JWT_SECRET){
        throw new Error("JWT secret must be set");
    }

    const token = jwt.sign( 
        { sub: user.id, role: user.role },
        process.env.JWT_SECRET 
    )

    return { user, token}
}