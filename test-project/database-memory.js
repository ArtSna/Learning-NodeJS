import { randomUUID } from 'node:crypto';
import { sql } from './db.js';
export class DatabaseMemory {

    async list(search) {
        let imgs;
       
        if(search) {
            imgs = await sql`SELECT * FROM imgs WHERE title ilike ${'%' + search + '%'}`
        } else {
            imgs = await sql`SELECT * FROM imgs`;
        }

        return imgs;
    }

    async create(img) {
        const imgId = randomUUID();
        const { title, description, url } = img;

        await sql`INSERT INTO imgs(id, title, description, url) VALUES (${imgId}, ${title}, ${description}, ${url});`;
    }

    async update(id, img) {
        const { title, description, url } = img;

        await sql`UPDATE imgs SET title = ${title}, description = ${description}, url = ${url} WHERE id = ${id};`
    }

    async delete(id) {
        await sql`DELETE FROM imgs WHERE id = ${id};`
    }
}