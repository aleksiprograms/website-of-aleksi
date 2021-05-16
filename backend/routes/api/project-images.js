const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const database = require('../../utils/database');
const authorization = require('../../utils/authorization');

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        cb(null, `${uuidv4()}.${extension}`);
    },
});

const upload = multer({ storage }).single('file');

router.post('/', (request, response) => {
    if (!authorization.isAuthorized(request, response)) {
        return;
    }
    upload(request, response, (error) => {
        if (error) {
            return response.sendStatus(400);
        }
        const { body } = request;
        database
            .query(
                `
                INSERT INTO project_images (image_name, place, project_id)
                VALUES($1, $2, $3);
                `,
                [request.file.filename, body.place, body.project_id]
            )
            .then(() => {
                response.sendStatus(200);
            })
            .catch(() => {
                response.sendStatus(400);
            });
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
            UPDATE project_images
            SET place = $1
            WHERE id = $2;
            `,
            [body.place, request.params.id]
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
            DELETE FROM project_images
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
