import React from 'react';
import Project from './Project';

const Projects = ({ projects }) => {
    return (
        projects.map((project) => (
            <Project
                key={project.id}
                title={project.title}
                text={project.text}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                imageUrl={project.imageUrl}
                imageOrientation={project.imageOrientation}
            />
        ))
    );
};

export default Projects;