import React, { useState, useEffect } from 'react';
import projectService from '../services/projects';
import LoginForm from '../components/admin/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUpUser(user);
        }
    }, []);

    const setUpUser = (user) => {
        setUser(user);
        if (user === null) {
            projectService.setToken(null);
        } else {
            projectService.setToken(user.token);
        }
    }

    return (
        <div>
            {user === null ?
                <LoginForm setUpUser={setUpUser} /> :
                <AdminDashboard user={user} setUpUser={setUpUser} />
            }
        </div>
    );
};

export default AdminPage;