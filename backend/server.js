const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const users = require('./routes/api/users');
const projects = require('./routes/api/projects');
const tags = require('./routes/api/tags');
const projectTags = require('./routes/api/project-tags');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use((request, response, next) => {
        if (request.header('x-forwarded-proto') !== 'https') {
            response.redirect(
                `https://${request.header('host')}${request.url}`
            );
        } else {
            next();
        }
    });
}

app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tags', tags);
app.use('/api/project-tags', projectTags);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (request, response) => {
        response.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        );
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
