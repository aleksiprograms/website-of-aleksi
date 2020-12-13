import React, { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import Project from './Project';

const AllProjects = () => {
    const projectContext = useContext(ProjectContext);

    return (
        projectContext.projects.map((project) => (
            <Project
                key={project.id}
                project={project}
            />
        ))
    );
};

export default AllProjects;