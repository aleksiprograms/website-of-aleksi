const express = require('express');
const cors = require('cors');
const path = require('path');

const projects = require('./routes/api/projects');
const admin = require('./routes/admin');
const login = require('./routes/login');
const { request, response } = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projects);
app.use('/admin', admin);
app.use('/login', login);

if (process.env.NODE_ENV === 'production') {
    app.use((request, response, next) => {
        if (request.header('x-forwarded-proto') !== 'https') {
            response.redirect(`https://${request.header('host')}${request.url}`);
        } else {
            next();
        }
    });
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});