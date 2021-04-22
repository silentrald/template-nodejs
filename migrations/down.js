/**
 * Drops all the table in the database
 */

if (!process.env.CI) {
    require('dotenv').config();
}

const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

const config = {
    user:       process.env.POSTGRES_USER,
    password:   process.env.POSTGRES_PASSWORD,
    host:       process.env.POSTGRES_HOST,
    port:       process.env.POSTGRES_PORT,
    database:   process.env.POSTGRES_DB
};

const client = new Pool(config);

(async () => {
    try {
        const query = await fs.readFile(
            path.join(__dirname, 'sqls', 'down.sql'),
            { encoding: 'utf-8' }
        );
        await client.query(query);
        await client.end();
        console.log('Migration Down Done');
    } catch (err) {
        console.log(err);
        throw err;
    }
})();
