import React from 'react';
import Project from './Project';

const AllProjects = ({ projects }) => {
    return (
        projects.map((project) => (
            <Project
                key={project.id}
                title={project.title}
                text={project.text}
                platforms={project.platforms}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                imageUrl={project.imageUrl}
                imageOrientation={project.imageOrientation}
            />
        ))
    );
};

export default AllProjects;