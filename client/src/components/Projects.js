import React from 'react';
import Project from './Project';

const Projects = ({ projects }) => {
    return (
        projects.map((project) => (
            <Project
                key={project.id}
                title={project.title}
                text={project.text}
                link={project.link}
                imageLink={project.imageLink}
                imageOrientation={project.imageOrientation}
            />
        ))
    );
};

export default Projects;