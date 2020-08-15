const router = require('express').Router();
const { Client } = require('pg');

// Table of database creation
/*
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text VARCHAR(3000) NOT NULL,
    platforms VARCHAR(255) NOT NULL,
    technologies VARCHAR(255) NOT NULL,
    githuburl VARCHAR(255) NOT NULL,
    imageurl VARCHAR(255),
    imageorientation VARCHAR(255),
    placeinprojects INTEGER NOT NULL
);
*/

projectsOld = [
    {
        id: 1,
        title: "Website of Aleksi",
        text: "The site you are in right now is this project. This is my personal website to show my projects. At the moment all the data is saved in the backend code. The plan in the future is to use a PostgreSQL database and make an admin page, where I can modify projects.",
        platforms: "Web",
        technologies: "React, Node.js, Express, JavaScript",
        githubUrl: "https://github.com/aleksiprograms/website-of-aleksi",
        imageOrientation: "none"
    },
    {
        id: 2,
        title: "Battle Against Shapes",
        text: "Battle Against Shapes is a 2D game, where you fight with the armed ship against different shaped enemies. Your goal is to get as far as you can in your choosen difficulty. As the difficulty increases the number of different enemies increases. There are eight different kind of enemies and they have their own type of attacking method for example they shoot, explode near you or just attack you. You can choose one primary and one secondary weapon from eight different kind of weapons.",
        platforms: "Android, Desktop",
        technologies: "libGDX, Java",
        githubUrl: "https://github.com/aleksiprograms/battle-against-shapes",
        imageUrl: "https://dl.dropboxusercontent.com/s/b5q8qe37sxxb3nj/battleagainstshapesgameplay.png?dl=0",
        imageOrientation: "landscape"
    },
    {
        id: 3,
        title: "Survival of Keijo",
        text: "Survival of Keijo is an unfinished 3D game, where you try to survive against waves of armed enemies. There is a shop, where you can buy weapons and ammunition, and upgrade your weapons.",
        platforms: "Android, Desktop",
        technologies: "libGDX, Java",
        githubUrl: "https://github.com/aleksiprograms/survival-of-keijo",
        imageUrl: "https://dl.dropboxusercontent.com/s/1stl04kf3gdkvlr/survivalofkeijogameplay.jpg?dl=0",
        imageOrientation: "landscape"
    },
    {
        id: 4,
        title: "Stopwatch",
        text: "This is a stopwatch app, where you can make multible stopwatches and run them at the same time. The app is not meant for very accurate measurements (accuracy is about plus-minus 0.1 s).",
        platforms: "Android, iOS",
        technologies: "React Native, JavaScript",
        githubUrl: "https://github.com/aleksiprograms/stopwatch",
        imageUrl: "https://dl.dropboxusercontent.com/s/vaa11eef3nz84g6/stopwatchmain.jpg?dl=0",
        imageOrientation: "portrait"
    },
    {
        id: 5,
        title: "Calculator",
        text: "This is a calculator app, where you can make quite complex calculations. The calculation are saved to history and you can reuse them or make variable from its result. You can make your own variables/constants and use them in your calculations.",
        platforms: "Android",
        technologies: "Android, Java",
        githubUrl: "https://github.com/aleksiprograms/calculator",
        imageUrl: "https://dl.dropboxusercontent.com/s/3favd2pwi4d3hjn/calculatormain.jpg?dl=0",
        imageOrientation: "portrait"
    },
];

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

router.get('/', async (request, response) => {
    let res = await client.query('SELECT * FROM projects ORDER BY placeinprojects ASC');
    let projects = [];
    for (let row of res.rows) {
        projects.push({
            id: row.id,
            title: row.title,
            text: row.text,
            platforms: row.platforms,
            technologies: row.technologies,
            githubUrl: row.githuburl,
            imageUrl: row.imageurl,
            imageOrientation: row.imageorientation
        });
    }
    response.json(projects);
});

module.exports = router;