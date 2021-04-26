const router = require('express').Router();
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

router.get('/', (request, response) => {
    database
        .query('SELECT * FROM projects ORDER BY place ASC')
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
        .query('SELECT * FROM projects WHERE id = $1', [request.params.id])
        .then((result) => {
            const { rows } = result;
            response.status(200).json(rows[0]);
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
            'INSERT INTO projects (' +
                'title, ' +
                'text, ' +
                'place' +
                ') ' +
                'VALUES($1, $2, $3)' +
                'RETURNING id',
            [body.title, body.text, body.place]
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
                'place = $3 ' +
                'WHERE id = $4',
            [body.title, body.text, body.place, request.params.id]
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
