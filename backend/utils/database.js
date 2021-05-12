const { Client } = require('pg');

/*
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
*/

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client
    .connect()
    .then(() => {
        console.log('Database connected');
        return client.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            `
        );
    })
    .then(() => {
        console.log('Table users OK');
        return client.query(
            `
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                text VARCHAR(3000) NOT NULL,
                place INTEGER NOT NULL
            );
            `
        );
    })
    .then(() => {
        console.log('Table projects OK');
        return client.query(
            `
            CREATE TABLE IF NOT EXISTS tags (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                importance VARCHAR(255) NOT NULL
            );
            `
        );
    })
    .then(() => {
        console.log('Table tags OK');
        return client.query(
            `
            CREATE TABLE IF NOT EXISTS project_images (
                id SERIAL PRIMARY KEY,
                image_name VARCHAR(255) NOT NULL,
                project_id INT NOT NULL,
                CONSTRAINT fk_project
                    FOREIGN KEY(project_id)
                        REFERENCES projects(id)
                        ON DELETE CASCADE
            );
            `
        );
    })
    .then(() => {
        console.log('Table project_images OK');
        return client.query(
            `
            CREATE TABLE IF NOT EXISTS project_tags (
                id SERIAL PRIMARY KEY,
                project_id INT NOT NULL,
                tag_id INT NOT NULL,
                CONSTRAINT fk_project
                    FOREIGN KEY(project_id)
                        REFERENCES projects(id)
                        ON DELETE CASCADE,
                CONSTRAINT fk_tag
                    FOREIGN KEY(tag_id)
                        REFERENCES tags(id)
                        ON DELETE CASCADE
            );
            `
        );
    })
    .then(() => {
        console.log('Table project_tags OK');
    })
    .catch((error) => {
        console.log('Database error', error);
    });

module.exports = {
    query: (text, values) => client.query(text, values),
};
