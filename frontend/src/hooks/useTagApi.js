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

    const getMaxPlaceOfTags = () => {
        return axios.post('/api/tags/get-max-place');
    };

    const addTag = (tag) => {
        return axios.post('/api/tags', tag, getTokenConfig());
    };

    const editTag = (tag) => {
        return axios.put(`/api/tags/${tag.id}`, tag, getTokenConfig());
    };

    const removeTag = (id) => {
        return axios.delete(`/api/tags/${id}`, getTokenConfig());
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
        getMaxPlaceOfTags,
        addTag,
        editTag,
        removeTag,
    };
};

export default useTagApi;
