import React, { createContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
    }, []);

    let values = {
        projects,
        setProjects,
    }

    return (
        <ProjectContext.Provider value={values}>
            {children}
        </ProjectContext.Provider>
    );
};

export { ProjectContext, ProjectProvider };