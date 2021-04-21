const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const database = require('../../utils/database');

router.post('/login', async (request, response) => {
    const { body } = request;
    let user = null;
    const { rows } = await database.query('SELECT * FROM Users');
    user = rows.find((row) => row.username === body.username);

    const passwordCorrect =
        user != null
            ? await bcryptjs.compare(body.password, user.password)
            : false;

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            message: 'Invalid username or password',
        });
    }

    const userForToken = { username: user.username };
    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    response.status(200).json({ token, username: user.username });
});

router.post('/validate-token', (request, response) => {
    const { body } = request;
    jwt.verify(body.token, process.env.JWT_SECRET, (error) => {
        if (error) {
            response.sendStatus(422);
        } else {
            response.sendStatus(200);
        }
    });
});

module.exports = router;
