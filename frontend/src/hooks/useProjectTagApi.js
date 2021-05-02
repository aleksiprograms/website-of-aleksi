import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useProjectTagApi = () => {
    const userContext = useContext(UserContext);

    const addProjectTag = (projectTag) => {
        return axios.post('/api/project-tags', projectTag, getTokenConfig());
    };

    const removeProjectTag = (id) => {
        return axios.delete(`/api/project-tags/${id}`, getTokenConfig());
    };

    const getTokenConfig = () => {
        let token = userContext.user.token;
        const config = {
            headers: { Authorization: `bearer ${token}` },
        };
        return config;
    };

    return {
        addProjectTag,
        removeProjectTag,
    };
};

export default useProjectTagApi;
