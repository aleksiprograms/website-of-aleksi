const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};

const isAuthorized = (request, response) => {
    const token = getTokenFrom(request);
    let authorized = false;
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if (error) {
            authorized = false;
            response.status(401).json({
                message: 'Token missing or invalid',
            });
        } else {
            authorized = true;
        }
    });
    return authorized;
};

module.exports = {
    isAuthorized,
};
