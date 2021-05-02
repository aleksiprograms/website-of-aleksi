const router = require('express').Router();
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

router.post('/', (request, response) => {
    if (!authorization.isAuthorized(request, response)) {
        return;
    }
    const { body } = request;
    database
        .query(
            `
            INSERT INTO project_tags (project_id, tag_id)
            VALUES($1, $2);
            `,
            [body.project_id, body.tag_id]
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
            DELETE FROM project_tags
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
