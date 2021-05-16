import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useProjectImageApi = () => {
    const userContext = useContext(UserContext);

    const addProjectImage = (values) => {
        return axios.post('/api/project-images', values, getConfig());
    };

    const editProjectImage = (values) => {
        return axios.put(
            `/api/project-images/${values.id}`,
            values,
            getTokenConfig()
        );
    };

    const removeProjectImage = (id) => {
        return axios.delete(`/api/project-images/${id}`, getTokenConfig());
    };

    const getConfig = () => {
        let token = userContext.user.token;
        const config = {
            headers: {
                Authorization: `bearer ${token}`,
                'content-type': 'multipart/form-data',
            },
        };
        return config;
    };

    const getTokenConfig = () => {
        let token = userContext.user.token;
        const config = {
            headers: { Authorization: `bearer ${token}` },
        };
        return config;
    };

    return {
        addProjectImage,
        editProjectImage,
        removeProjectImage,
    };
};

export default useProjectImageApi;
