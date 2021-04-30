import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useTagApi = () => {
    const userContext = useContext(UserContext);

    const getTags = () => {
        return axios.get('/api/tags');
    };

    const getTag = (id) => {
        return axios.get(`/api/tags/${id}`);
    };

    const addTag = (tag) => {
        return axios.post('/api/tags', tag, getTokenConfig());
    };

    const editTag = (tag) => {
        return axios.put(`/api/tags/${tag.id}`, tag, getTokenConfig());
    };

    const getTokenConfig = () => {
        let token = userContext.user.token;
        const config = {
            headers: { Authorization: `bearer ${token}` },
        };
        return config;
    };

    return {
        getTags,
        getTag,
        addTag,
        editTag,
    };
};

export default useTagApi;
