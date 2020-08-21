import React from 'react';
import ProjectAdmin from './ProjectAdmin';

const ProjectsAdmin = ({ projects }) => {
    return (
        projects.map((project) => (
            <ProjectAdmin
                key={project.id}
                id={project.id}
                title={project.title}
            />
        ))
    );
};

export default ProjectsAdmin;