import axios from 'axios';

const useUserApi = () => {
    const login = (username, password) => {
        return axios.post('/api/users/login', { username, password });
    };

    const validateToken = (token) => {
        return axios.post('/api/users/validate-token', { token });
    };

    return {
        login,
        validateToken,
    };
};

export default useUserApi;
