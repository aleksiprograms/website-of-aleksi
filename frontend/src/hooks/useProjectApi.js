import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { ProjectContext } from '../context/ProjectContext';

const useProjectApi = () => {
    const userContext = useContext(UserContext);
    const projectContext = useContext(ProjectContext);

    const getProjects = () => {
        axios
            .get('/api/projects')
            .then((response) => {
                projectContext.setProjects(response.data);
            })
            .catch(() => {});
    };

    const addProject = (project) => {
        project.placeInProjects = projectContext.projects.length + 1;
        axios
            .post('/api/projects', project, getTokenConfig())
            .then((response) => {
                project.id = response.data.id;
                projectContext.setProjects((prevProjects) => {
                    return [...prevProjects, project];
                });
            })
            .catch(() => {});
    };

    const editProject = (project) => {
        axios
            .put(`${'/api/projects'}/${project.id}`, project, getTokenConfig())
            .then(() => {
                projectContext.setProjects((prevProjects) => {
                    return prevProjects.map((prevProject) => {
                        if (prevProject.id === project.id) {
                            return project;
                        } else {
                            return prevProject;
                        }
                    });
                });
            })
            .catch(() => {});
    };

    const removeProject = (id) => {
        axios
            .delete(`${'/api/projects'}/${id}`, getTokenConfig())
            .then(() => {
                projectContext.setProjects((prevProjects) => {
                    return prevProjects.filter((item) => item.id !== id);
                });
            })
            .catch(() => {});
    };

    const reorderProjects = (result) => {
        projectContext.setLoading(true);
        const items = Array.from(projectContext.projects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        projectContext.setProjects(items);
        let posts = [];
        for (let i = 0; i < items.length; i++) {
            let project = {
                ...items[i],
                placeInProjects: i + 1,
            };
            posts[i] = axios.put(
                `${'/api/projects'}/${project.id}`,
                project,
                getTokenConfig()
            );
        }
        axios
            .all(posts)
            .then(axios.spread(() => {}))
            .catch(() => {})
            .finally(() => {
                projectContext.setLoading(false);
            });
    };

    const getTokenConfig = () => {
        let token = userContext.user.token;
        const config = {
            headers: { Authorization: `bearer ${token}` },
        };
        return config;
    };

    return {
        getProjects,
        addProject,
        editProject,
        removeProject,
        reorderProjects,
    };
};

export default useProjectApi;
