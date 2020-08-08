const router = require('express').Router();

projects = [
    {
        id: 1,
        title: "Website of Aleksi",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum.",
        githubUrl: "https://github.com/aleksiprograms/website-of-aleksi",
        imageOrientation: "none"
    },
    {
        id: 2,
        title: "Battle Against Shapes",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum.",
        githubUrl: "https://github.com/aleksiprograms/battle-against-shapes",
        imageUrl: "https://dl.dropboxusercontent.com/s/b5q8qe37sxxb3nj/battleagainstshapesgameplay.png?dl=0",
        imageOrientation: "landscape"
    },
    {
        id: 3,
        title: "Survival of Keijo",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum.",
        githubUrl: "https://github.com/aleksiprograms/stopwatch",
        imageUrl: "https://dl.dropboxusercontent.com/s/1stl04kf3gdkvlr/survivalofkeijogameplay.jpg?dl=0",
        imageOrientation: "landscape"
    },
    {
        id: 4,
        title: "Stopwatch",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum.",
        githubUrl: "https://github.com/aleksiprograms/website-of-aleksi",
        imageUrl: "https://dl.dropboxusercontent.com/s/vaa11eef3nz84g6/stopwatchmain.jpg?dl=0",
        imageOrientation: "portrait"
    },
    {
        id: 5,
        title: "Calculator",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum.",
        githubUrl: "https://github.com/aleksiprograms/calculator",
        imageUrl: "https://dl.dropboxusercontent.com/s/3favd2pwi4d3hjn/calculatormain.jpg?dl=0",
        imageOrientation: "portrait"
    },
];

router.get('/', (request, response) => {
    response.json(projects);
});

module.exports = router;