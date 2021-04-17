import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const useUser = () => {
    const userContext = useContext(UserContext);

    const login = (username, password) => {
        userContext.setError('');
        axios
            .post('/api/login', { username, password })
            .then((response) => {
                userContext.setUser(response.data);
                window.localStorage.setItem(
                    'adminUser',
                    JSON.stringify(response.data)
                );
            })
            .catch(() => {
                userContext.setUser(null);
                userContext.setError('Invalid username or password');
            });
    };

    const logout = () => {
        window.localStorage.removeItem('adminUser');
        userContext.setUser(null);
        userContext.setError('');
    };

    const initIfSaved = () => {
        const adminUserJSON = window.localStorage.getItem('adminUser');
        if (adminUserJSON) {
            userContext.setUser(JSON.parse(adminUserJSON));
        }
    };

    return {
        login,
        logout,
        initIfSaved,
    };
};

export default useUser;
