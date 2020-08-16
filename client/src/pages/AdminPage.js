import React, { useState, useEffect } from 'react';
import axios from 'axios'
import LoginForm from '../components/admin/LoginForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import ErrorMessage from '../components/admin/ErrorMessage';

const AdminPage = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const login = async (event) => {
        event.preventDefault();
        try {
            const user = await axios.post(
                '/login',
                { username: username, password: password });
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            );
            setUser(user);
            setUsername('');
            setPassword('');
            setErrorMessage('');
        } catch (exception) {
            setErrorMessage('Invalid username or password');
        }
    }

    const logout = async (event) => {
        event.preventDefault();
        window.localStorage.removeItem('loggedUser')
        setUser(null);
        setUsername('');
        setPassword('');
        setErrorMessage('');
    }

    return (
        <div>
            <ErrorMessage message={errorMessage} />
            {user === null ?
                <LoginForm
                    username={username}
                    password={password}
                    onUsernameChange={({ target }) => setUsername(target.value)}
                    onPasswordChange={({ target }) => setPassword(target.value)}
                    login={login}
                /> :
                <AdminDashboard logout={logout} />
            }
        </div>
    );
};

export default AdminPage;