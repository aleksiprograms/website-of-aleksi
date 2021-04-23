import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useProjectApi = () => {
    const userContext = useContext(UserContext);

    const getProjects = () => {
        return axios.get('/api/projects');
    };

    const getProject = (id) => {
        return axios.get(`/api/projects/${id}`);
    };

    const countProjects = () => {
        return axios.post('/api/projects/count');
    };

    const addProject = (project) => {
        return axios.post('/api/projects', project, getTokenConfig());
    };

    const editProject = (project) => {
        return axios.put(
            `/api/projects/${project.id}`,
            project,
            getTokenConfig()
        );
    };

    const removeProject = (id) => {
        return axios.delete(`/api/projects/${id}`, getTokenConfig());
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
        getProject,
        countProjects,
        addProject,
        editProject,
        removeProject,
    };
};

export default useProjectApi;
