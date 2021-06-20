const router = require('express').Router();
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

router.get('/', (request, response) => {
    database
        .query(
            `
            SELECT * FROM tags ORDER BY place ASC;
            `
        )
        .then((result) => {
            const { rows } = result;
            response.status(200).json(rows);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.get('/:id', (request, response) => {
    database
        .query(
            `
            SELECT * FROM tags WHERE id = $1;
            `,
            [request.params.id]
        )
        .then((result) => {
            const { rows } = result;
            response.status(200).json(rows[0]);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

router.post('/get-max-place', (request, response) => {
    database
        .query(
            `
            SELECT MAX(place) FROM tags;
            `
        )
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
            `
            INSERT INTO tags (name, importance, place)
            VALUES($1, $2, $3)
            RETURNING id;
            `,
            [body.name, body.importance, body.place]
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
            `
            UPDATE tags
            SET name = $1, importance = $2, place = $3
            WHERE id = $4;
            `,
            [body.name, body.importance, body.place, request.params.id]
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
        .query(
            `
            DELETE FROM tags
            WHERE id = $1;
            `,
            [request.params.id]
        )
        .then(() => {
            response.sendStatus(200);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

module.exports = router;
