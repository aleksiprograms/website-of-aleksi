const { Client } = require('pg');

// users table creation
/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
*/

// projects table creation
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

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client
    .connect()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Database connection error', error);
    });

module.exports = {
    query: (text, values) => client.query(text, values),
};
