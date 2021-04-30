const { Client } = require('pg');

// users table creation
/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
*/

// old projects table creation
/*
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text VARCHAR(3000) NOT NULL,
    platforms VARCHAR(255) NOT NULL,
    technologies VARCHAR(255) NOT NULL,
    githuburl VARCHAR(255) NOT NULL,
    imageurl VARCHAR(255),
    imageorientation VARCHAR(255),
    placeinprojects INTEGER NOT NULL
);
*/

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
            'CREATE TABLE IF NOT EXISTS users (' +
                'id SERIAL PRIMARY KEY, ' +
                'username VARCHAR(255) NOT NULL, ' +
                'password VARCHAR(255) NOT NULL' +
                ');'
        );
    })
    .then(() => {
        console.log('Table users OK');
        return client.query(
            'CREATE TABLE IF NOT EXISTS projects (' +
                'id SERIAL PRIMARY KEY, ' +
                'title VARCHAR(255) NOT NULL, ' +
                'text VARCHAR(3000) NOT NULL, ' +
                'place INTEGER NOT NULL' +
                ');'
        );
    })
    .then(() => {
        console.log('Table projects OK');
        return client.query(
            'CREATE TABLE IF NOT EXISTS tags (' +
                'id SERIAL PRIMARY KEY, ' +
                'name VARCHAR(255) NOT NULL, ' +
                'importance VARCHAR(255) NOT NULL' +
                ');'
        );
    })
    .then(() => {
        console.log('Table tags OK');
    })
    .catch((error) => {
        console.log('Database error', error);
    });

module.exports = {
    query: (text, values) => client.query(text, values),
};
