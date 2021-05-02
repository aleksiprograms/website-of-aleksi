const router = require('express').Router();
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

router.get('/', (request, response) => {
    database
        .query(
            `
            SELECT * FROM tags ORDER BY importance ASC, id ASC;
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

router.post('/', (request, response) => {
    if (!authorization.isAuthorized(request, response)) {
        return;
    }
    const { body } = request;
    database
        .query(
            `
            INSERT INTO tags (name, importance)
            VALUES($1, $2)
            RETURNING id;
            `,
            [body.name, body.importance]
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
            SET name = $1, importance = $2
            WHERE id = $3;
            `,
            [body.name, body.importance, request.params.id]
        )
        .then(() => {
            response.sendStatus(200);
        })
        .catch(() => {
            response.sendStatus(400);
        });
});

module.exports = router;
