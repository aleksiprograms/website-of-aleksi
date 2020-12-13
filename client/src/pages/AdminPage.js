import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/admin/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
    const userContext = useContext(UserContext);

    useEffect(() => {
        const adminUserJSON = window.localStorage.getItem('adminUser');
        if (adminUserJSON) {
            userContext.setUser(JSON.parse(adminUserJSON));
        }
    }, []);

    return (
        <div>
            {userContext.user === null ?
                <LoginForm /> :
                <AdminDashboard />
            }
        </div>
    );
};

export default AdminPage;