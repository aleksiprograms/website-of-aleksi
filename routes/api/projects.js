const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Client } = require('pg');

// Table of database creation
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

const isAuthorized = (request) => {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!token || !decodedToken.username) {
        return false;
    }
    return true;
}

const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

router.get('/', async (request, response) => {
    let result = await client.query('SELECT * FROM projects ORDER BY placeinprojects ASC');
    let projects = [];
    for (let row of result.rows) {
        projects.push({
            id: row.id,
            title: row.title,
            text: row.text,
            platforms: row.platforms,
            technologies: row.technologies,
            githubUrl: row.githuburl,
            imageUrl: row.imageurl,
            imageOrientation: row.imageorientation,
            placeInProjects: row.placeinprojects
        });
    }
    response.status(200).json(projects);
});

router.post('/', async (request, response) => {
    if (!isAuthorized(request)) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    try {
        const result = await client.query(
            'INSERT INTO projects '
            + '('
            + 'title, '
            + 'text, '
            + 'platforms, '
            + 'technologies, '
            + 'githuburl, '
            + 'imageurl, '
            + 'imageorientation, '
            + 'placeinprojects'
            + ') '
            + 'VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
            + 'RETURNING id',
            [
                body.title,
                body.text,
                body.platforms,
                body.technologies,
                body.githubUrl,
                body.imageUrl,
                body.imageOrientation,
                body.placeInProjects
            ]
        );
        response.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        response.sendStatus(400);
    }
});

router.put('/:id', async (request, response) => {
    if (!isAuthorized(request)) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const body = request.body;
    try {
        await client.query(
            'UPDATE projects '
            + 'SET '
            + 'title = $1, '
            + 'text = $2, '
            + 'platforms = $3, '
            + 'technologies = $4, '
            + 'githuburl = $5, '
            + 'imageurl = $6, '
            + 'imageorientation = $7, '
            + 'placeinprojects = $8 '
            + 'WHERE id = $9',
            [
                body.title,
                body.text,
                body.platforms,
                body.technologies,
                body.githubUrl,
                body.imageUrl,
                body.imageOrientation,
                body.placeInProjects,
                request.params.id
            ]
        );
    } catch (error) {
        response.sendStatus(400);
    }
    response.sendStatus(200);
});

router.delete('/:id', async (request, response) => {
    if (!isAuthorized(request)) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        await client.query(
            'DELETE FROM projects WHERE id = $1', [request.params.id]);
    } catch (error) {
        response.sendStatus(400);
    }
    response.sendStatus(200);
});

module.exports = router;