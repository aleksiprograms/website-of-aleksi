const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { Client } = require('pg');

// Table of database creation
/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
*/

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

router.post('/', async (request, response) => {
    const body = request.body;
    let user = null;
    let res = await client.query('SELECT * FROM Users');
    for (let row of res.rows) {
        if (row.username === body.username) {
            user = row;
            break;
        }
    }

    const passwordCorrect = user === null
        ? false
        : await bcryptjs.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = { username: user.username };
    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    response
        .status(200)
        .send({ token, username: user.username });
});

module.exports = router;