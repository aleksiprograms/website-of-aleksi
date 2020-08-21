import React, { useState, useEffect } from 'react';
import LoginForm from '../components/admin/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    return (
        <div>
            {user === null ?
                <LoginForm setUser={setUser} /> :
                <AdminDashboard setUser={setUser} />
            }
        </div>
    );
};

export default AdminPage;