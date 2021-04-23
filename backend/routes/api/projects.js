const router = require('express').Router();
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

router.get('/', (request, response) => {
    database
        .query('SELECT * FROM projects ORDER BY placeinprojects ASC')
        .then((result) => {
            const { rows } = result;
            const projects = rows.map((row) => ({
                id: row.id,
                title: row.title,
                text: row.text,
                platforms: row.platforms,
                technologies: row.technologies,
                githubUrl: row.githuburl,
                imageUrl: row.imageurl,
                imageOrientation: row.imageorientation,
                placeInProjects: row.placeinprojects,
            }));
            response.status(200).json(projects);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.get('/:id', (request, response) => {
    database
        .query('SELECT * FROM projects WHERE id = $1', [request.params.id])
        .then((result) => {
            const { rows } = result;
            const row = rows[0];
            const project = {
                id: row.id,
                title: row.title,
                text: row.text,
                platforms: row.platforms,
                technologies: row.technologies,
                githubUrl: row.githuburl,
                imageUrl: row.imageurl,
                imageOrientation: row.imageorientation,
                placeInProjects: row.placeinprojects,
            };
            response.status(200).json(project);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.post('/count', (request, response) => {
    database
        .query('SELECT COUNT(*) FROM projects')
        .then((result) => {
            const { rows } = result;
            const row = rows[0];
            response.status(200).json(row);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.post('/', (request, response) => {
    if (!authorization.isAuthorized(request, response)) {
        return;
    }
    const { body } = request;
    database
        .query(
            'INSERT INTO projects ' +
                '(' +
                'title, ' +
                'text, ' +
                'platforms, ' +
                'technologies, ' +
                'githuburl, ' +
                'imageurl, ' +
                'imageorientation, ' +
                'placeinprojects' +
                ') ' +
                'VALUES($1, $2, $3, $4, $5, $6, $7, $8)' +
                'RETURNING id',
            [
                body.title,
                body.text,
                body.platforms,
                body.technologies,
                body.githubUrl,
                body.imageUrl,
                body.imageOrientation,
                body.placeInProjects,
            ]
        )
        .then((result) => {
            response.status(200).json({ id: result.rows[0].id });
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.put('/:id', (request, response) => {
    if (!authorization.isAuthorized(request, response)) {
        return;
    }
    const { body } = request;
    database
        .query(
            'UPDATE projects ' +
                'SET ' +
                'title = $1, ' +
                'text = $2, ' +
                'platforms = $3, ' +
                'technologies = $4, ' +
                'githuburl = $5, ' +
                'imageurl = $6, ' +
                'imageorientation = $7, ' +
                'placeinprojects = $8 ' +
                'WHERE id = $9',
            [
                body.title,
                body.text,
                body.platforms,
                body.technologies,
                body.githubUrl,
                body.imageUrl,
                body.imageOrientation,
                body.placeInProjects,
                request.params.id,
            ]
        )
        .then(() => {
            response.sendStatus(200);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.delete('/:id', (request, response) => {
    if (!authorization.isAuthorized(request, response)) {
        return;
    }
    database
        .query('DELETE FROM projects WHERE id = $1', [request.params.id])
        .then(() => {
            response.sendStatus(200);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

module.exports = router;
