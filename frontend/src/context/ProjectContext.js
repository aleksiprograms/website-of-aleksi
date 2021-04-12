import React, { createContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);

    let values = {
        projects,
        setProjects,
        loading,
        setLoading,
    }

    return (
        <ProjectContext.Provider value={values}>
            {children}
        </ProjectContext.Provider>
    );
};

export { ProjectContext, ProjectProvider };