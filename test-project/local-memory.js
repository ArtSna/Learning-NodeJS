import { randomUUID } from 'node:crypto';

export class LocalMemory {
    #imgs = new Map();

    list(search) {
        return Array.from(this.#imgs.entries()).map((arr) => {
            const id = arr[0];
            const data = arr[1];

            return {
                id,
                ...data,
            }
        })
        .filter(img => {
            if(search) {
                return img.title.toLowerCase().includes(search.toLowerCase());
            }

            return true;
        });
    }

    create(img) {
        const imgId = randomUUID();
        this.#imgs.set(imgId, img);
    }

    update(id, img) {
        this.#imgs.set(id, img);
    }

    delete(id) {
        this.#imgs.delete(id);
    }
}