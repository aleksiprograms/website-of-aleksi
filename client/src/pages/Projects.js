import React from 'react';
import '../App.css';
import Project from '../components/Project';

const Projects = () => {
    return (
        <div>
            <h2 className="pageTitle">Projects</h2>
            <p className="mainText">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque fringilla lacus non tellus ultricies varius sit amet
                eget <a className="link" href="https://github.com/aleksiprograms" target="_blank">Github profile</a> nulla.
                Vestibulum ante ipsum primis in faucibus orci luctus
                et ultrices posuere cubilia curae; Vivamus in odio id libero
                ornare imperdiet eget non neque. Sed semper felis neque,
                molestie aliquam tortor condimentum.
            </p>
            <Project
                title="Website of Aleksi"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum."
                link="https://github.com/aleksiprograms/website-of-aleksi"
                imageOrientation="none"
            />
            <Project
                title="Battle Against Shapes"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum."
                link="https://github.com/aleksiprograms/battle-against-shapes"
                imageLink="https://dl.dropboxusercontent.com/s/b5q8qe37sxxb3nj/battleagainstshapesgameplay.png?dl=0"
                imageOrientation="landscape"
            />
            <Project
                title="Survival of Keijo"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum."
                link="https://github.com/aleksiprograms/survival-of-keijo"
                imageLink="https://dl.dropboxusercontent.com/s/1stl04kf3gdkvlr/survivalofkeijogameplay.jpg?dl=0"
                imageOrientation="landscape"
            />
            <Project
                title="Stopwatch"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum."
                link="https://github.com/aleksiprograms/stopwatch"
                imageLink="https://dl.dropboxusercontent.com/s/vaa11eef3nz84g6/stopwatchmain.jpg?dl=0"
                imageOrientation="portrait"
            />
            <Project
                title="Calculator"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla lacus non tellus ultricies varius sit amet eget nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus in odio id libero ornare imperdiet eget non neque. Sed semper felis neque, molestie aliquam tortor condimentum."
                link="https://github.com/aleksiprograms/calculator"
                imageLink="https://dl.dropboxusercontent.com/s/3favd2pwi4d3hjn/calculatormain.jpg?dl=0"
                imageOrientation="portrait"
            />
        </div>
    );
};

export default Projects;