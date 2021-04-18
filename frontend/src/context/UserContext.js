import React, { createContext, useEffect, useState } from 'react';
import useUserApi from '../hooks/useUserApi';

const UserContext = createContext();

const UserProvider = (props) => {
    const { children } = props;

    const userApi = useUserApi();

    const [user, setUser] = useState(null);
    const [authenticating, setAuthenticating] = useState(false);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = () => {
        const userJSON = window.localStorage.getItem('user');
        if (userJSON) {
            setAuthenticating(true);
            const userData = JSON.parse(userJSON);
            userApi
                .validateToken(userData?.token)
                .then(() => {
                    setUser(userData);
                })
                .catch(() => {
                    setUser(null);
                })
                .finally(() => {
                    setAuthenticating(false);
                });
        }
    };

    const onLogin = (userData) => {
        setUser(userData);
        window.localStorage.setItem('user', JSON.stringify(userData));
    };

    const onLogout = () => {
        setUser(null);
        window.localStorage.removeItem('user');
    };

    let values = {
        authenticating,
        user,
        setUser,
        onLogin,
        onLogout,
    };

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };
