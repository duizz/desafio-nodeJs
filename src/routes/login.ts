import type { FastifyPluginAsyncZod }  from 'fastify-type-provider-zod'
import { db } from "../database/client.ts";
import { users } from "../database/schema.ts";
import { z } from 'zod'
import { eq } from 'drizzle-orm';
import { verify } from 'argon2';
import jwt from 'jsonwebtoken'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
    server.post("/sessions",{
        schema:{
            tags: [ 'Auth' ],
            summary: 'login',
            body: z.object({
                email: z.email(),
                password: z.string()
            }),
            response:{
                200: z.object({ token: z.string() }),
                400: z.object({ message: z.string() })
            }
        },
    }, async (request, reply) => {
    
        const { email, password } = request.body
    
        const result = await db.select()
            .from(users)
            .where(eq(users.email, email))
        
        if(result.length === 0){
            return reply.status(400).send({ message: 'Invalid Credentials'})
        }

        const user = result[0]
        const doesPassowrdMatch = await verify(user.password, password)

        if(!doesPassowrdMatch){
            return reply.status(400).send({ message: 'Invalid Credentials'})
        }

        if(!process.env.JWT_SECRET){
            throw new Error("JWT secret must be set");
        }

        const token = jwt.sign( 
            { sub: user.id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: 300000 }
        )
        
        return reply.status(200).send({ token })
    })
} 
