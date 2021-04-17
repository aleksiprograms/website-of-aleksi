import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

const ProjectProvider = (props) => {
    const { children } = props;

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    let values = {
        projects,
        setProjects,
        loading,
        setLoading,
    };

    return (
        <ProjectContext.Provider value={values}>
            {children}
        </ProjectContext.Provider>
    );
};

export { ProjectContext, ProjectProvider };
