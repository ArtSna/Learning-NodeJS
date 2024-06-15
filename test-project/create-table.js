import { sql } from './db.js'

/*sql `DROP TABLE IF EXISTS imgs;`.then(() => {
    console.log("droped!");
})*/

sql `
    CREATE TABLE imgs (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        url         TEXT
    );
`.then(() => {
    console.log("created!");
})