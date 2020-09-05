import React from 'react';
import { useSelector } from 'react-redux';
import Project from './Project';

const AllProjects = () => {
    const projects = useSelector(state => state.projects);

    return (
        projects.map((project) => (
            <Project
                key={project.id}
                project={project}
            />
        ))
    );
};

export default AllProjects;