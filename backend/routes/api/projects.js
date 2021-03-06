const router = require('express').Router();
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

router.get('/', (request, response) => {
    database
        .query(
            `
            SELECT p.id, p.title, p.text, p.orientation, COALESCE(i.images, '[]') AS images, COALESCE(t.tags, '[]') AS tags
            FROM projects AS p
            LEFT JOIN (
                SELECT pi.project_id AS id, json_agg(json_build_object(
                    'image_name', pi.image_name
                ) ORDER BY place ASC) AS images
                FROM project_images AS pi
                GROUP BY pi.project_id
            ) AS i ON i.id = p.id
            LEFT JOIN (
                SELECT pt.project_id AS id, json_agg(json_build_object(
                    'name', t.name,
                    'importance', t.importance
                ) ORDER BY place ASC) AS tags
                FROM project_tags AS pt
                JOIN tags AS t ON t.id = pt.tag_id
                GROUP BY pt.project_id
            ) AS t ON t.id = p.id
            ORDER BY p.place ASC;
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
            SELECT p.id, p.title, p.text, p.place, p.orientation, COALESCE(i.images, '[]') AS images, COALESCE(t.tags, '[]') AS tags
            FROM projects AS p
            LEFT JOIN (
                SELECT pi.project_id AS id, json_agg(json_build_object(
                    'id', pi.id,
                    'image_name', pi.image_name
                ) ORDER BY place ASC) AS images
                FROM project_images AS pi
                GROUP BY pi.project_id
            ) AS i ON i.id = p.id
            LEFT JOIN (
                SELECT pt.project_id AS id, json_agg(json_build_object(
                    'id', t.id,
                    'name', t.name,
                    'importance', t.importance,
                    'project_tag_id', pt.id
                ) ORDER BY place ASC) AS tags
                FROM project_tags AS pt
                JOIN tags AS t ON t.id = pt.tag_id
                GROUP BY pt.project_id
            ) AS t ON t.id = p.id
            WHERE p.id = $1;
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

router.post('/count', (request, response) => {
    database
        .query(
            `
            SELECT COUNT(*) FROM projects;
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
            INSERT INTO projects (title, text, place, orientation)
            VALUES($1, $2, $3, $4)
            RETURNING id;
            `,
            [body.title, body.text, body.place, body.orientation]
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
            UPDATE projects
            SET title = $1, text = $2, place = $3, orientation = $4
            WHERE id = $5;
            `,
            [
                body.title,
                body.text,
                body.place,
                body.orientation,
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
        .query(
            `
            DELETE FROM projects
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
