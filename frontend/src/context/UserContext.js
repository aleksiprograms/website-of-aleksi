import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = (props) => {
    const { children } = props;

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    let values = {
        user,
        setUser,
        error,
        setError,
    };

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };
