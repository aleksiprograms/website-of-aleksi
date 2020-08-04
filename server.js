const express = require('express');
const cors = require('cors');

const projects = require('./routes/api/projects');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projects);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});