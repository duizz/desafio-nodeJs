import fastify, { FastifyReply, FastifyRequest } from "fastify";
import crypto from "node:crypto"

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
});

const courses = [
    { id: '1', title: 'Curso de Node.js'},
    { id: '2', title: 'Curso de Java'},
    { id: '3', title: 'Curso de Node.js'},
]

server.get("/courses", (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ courses })
})

server.get("/courses/:id", (request: FastifyRequest, reply: FastifyReply) => {

    type Params = {
        id: string
    }

    const { id } = request.params as Params
    const courseInfo = courses.find(course => course.id === id)

    if(!courseInfo){
        return reply.status(404).send({ message: 'course not found'})
    }

    return reply.status(200).send({ courseInfo })
})

server.post("/courses", (request: FastifyRequest, reply: FastifyReply) => {

    type Body = {
        title: string
    }

    const coursesId = crypto.randomUUID()
    const body = request.body as Body;
    const courseTitle = body.title;


    if(!courseTitle){
        return reply.status(404).send({ message: 'titulo obrigatorio'})
    }

    courses.push({id: coursesId, title: courseTitle});

    return reply.status(201).send(coursesId)
})

server.listen({
    port: 3333
}).then(() => console.log("Server http is ready"))