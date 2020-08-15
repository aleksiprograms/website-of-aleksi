import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Notification from '../components/Notification';
import LoginForm from '../components/LoginForm';
import Admin from '../components/Admin';

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
            <Notification message={errorMessage} />
            {user === null ?
                <LoginForm
                    username={username}
                    password={password}
                    onUsernameChange={({ target }) => setUsername(target.value)}
                    onPasswordChange={({ target }) => setPassword(target.value)}
                    login={login}
                /> :
                <Admin logout={logout} />
            }
        </div>
    );
};

export default AdminPage;