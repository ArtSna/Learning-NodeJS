import { fastify } from "fastify";
//import { LocalMemory } from "./local-memory.js";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();

server.get('/', () => {
    return "Hello World";
}); 

//##### GALLERY ######

server.post("/gallery", async (req, res) => {
    const { title, description, url } = req.body;
    
    await database.create({
        title,
        description,
        url
    });
    
    return res.status(201).send();
});

server.get("/gallery", async (req, res) => {
    const search = req.query.search;
    const imgs = await database.list(search);

    return imgs;
});

server.put("/gallery/:id", async (req, res) => {
    const { title, description, url } = req.body;
    const imgId = req.params.id;

    await database.update(imgId, {
        title,
        description,
        url
    });

    return res.status(204).send();
});

server.delete("/gallery/:id", async (req, res) => {
        const imgId = req.params.id;

        await database.delete(imgId);

        return res.status(204).send();
});

//##### GALLERY ######


server.listen({
    port: process.env.PORT ?? 3333
});