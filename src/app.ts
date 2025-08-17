import fastify from "fastify";
import { fastifySwagger } from '@fastify/swagger';
import scalarApiReference from '@scalar/fastify-api-reference'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { getCoursesRoute } from "./routes/get-courses.ts";
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts";
import { createCourseRoute } from "./routes/create-course.ts";
import { loginRoute } from "./routes/login.ts";

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        }
    }
}).withTypeProvider<ZodTypeProvider>();

if(process.env.NODE_ENV === 'development'){
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Course Management API',
                version: '1.0.0'
            }
        },
        transform: jsonSchemaTransform,
        })
        
    server.register(scalarApiReference , {
        routePrefix: '/docs',
    })
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);


server.register(getCoursesRoute)
server.register(getCourseByIdRoute)
server.register(createCourseRoute)
server.register(loginRoute)

export { server }