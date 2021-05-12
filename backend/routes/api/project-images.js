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
                INSERT INTO project_images (image_name, project_id)
                VALUES($1, $2);
                `,
                [request.file.filename, body.project_id]
            )
            .then(() => {
                response.sendStatus(200);
            })
            .catch(() => {
                response.sendStatus(400);
            });
    });
});

module.exports = router;
