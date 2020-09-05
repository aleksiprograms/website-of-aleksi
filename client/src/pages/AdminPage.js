import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authActions';
import LoginForm from '../components/admin/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const adminUserJSON = window.localStorage.getItem('adminUser');
        if (adminUserJSON) {
            dispatch(setUser(JSON.parse(adminUserJSON)));
        }
    }, []);

    return (
        <div>
            {auth.user === null ?
                <LoginForm /> :
                <AdminDashboard />
            }
        </div>
    );
};

export default AdminPage;