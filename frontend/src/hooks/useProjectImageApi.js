import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useProjectImageApi = () => {
    const userContext = useContext(UserContext);

    const addProjectImage = (values) => {
        return axios.post('/api/project-images', values, getConfig());
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

    return {
        addProjectImage,
    };
};

export default useProjectImageApi;
