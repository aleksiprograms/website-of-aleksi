const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { Client } = require('pg');
require('dotenv').config();

// Table of database creation
/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
*/

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
client.connect();

router.post('/', async (request, response) => {
    const { body } = request;
    let user = null;
    const { rows } = await client.query('SELECT * FROM Users');
    user = rows.find((row) => row.username === body.username);

    const passwordCorrect =
        user != null
            ? await bcryptjs.compare(body.password, user.password)
            : false;

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password',
        });
    }

    const userForToken = { username: user.username };
    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    response.status(200).json({ token, username: user.username });
});

module.exports = router;
