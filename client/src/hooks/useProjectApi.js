import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { ProjectContext } from '../context/ProjectContext';

const useProjectApi = () => {

    const userContext = useContext(UserContext);
    const projectContext = useContext(ProjectContext);

    const getProjects = () => {
        axios.get('/api/projects')
            .then((response) => {
                projectContext.setProjects(response.data);
            })
            .catch((error) => {
            });
    }

    const addProject = (project) => {
        axios.post('/api/projects', project, getTokenConfig())
            .then((response) => {
                project.id = response.data.id;
                projectContext.setProjects((prevProjects) => {
                    return [...prevProjects, project];
                })
            })
            .catch((error) => {
            });
    }

    const editProject = (project) => {
        axios.put(`${'/api/projects'}/${project.id}`, project, getTokenConfig())
            .then((response) => {
                projectContext.setProjects((prevProjects) => {
                    return prevProjects.map(prevProject => {
                        if (prevProject.id === project.id) {
                            return project;
                        } else {
                            return prevProject;
                        }
                    });
                })
            })
            .catch((error) => {
            });
    }

    const removeProject = (id) => {
        axios.delete(`${'/api/projects'}/${id}`, getTokenConfig())
            .then((response) => {
                projectContext.setProjects((prevProjects) => {
                    return prevProjects.filter(item => item.id !== id);
                })
            })
            .catch((error) => {
            });
    }

    const getTokenConfig = () => {
        let token = userContext.user.token;
        const config = {
            headers: { Authorization: `bearer ${token}` },
        }
        return config;
    }

    return ({
        getProjects,
        addProject,
        editProject,
        removeProject,
    });
};

export default useProjectApi;