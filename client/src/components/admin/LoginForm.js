import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import ErrorMessage from './ErrorMessage';

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (event) => {
        event.preventDefault();
        try {
            const user = await axios.post(
                '/login',
                {username: username, password: password});
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

    return (
        <div>
            <ErrorMessage message={errorMessage} />
            <h3>ADMIN LOGIN</h3>
            <form onSubmit={login}>
                <div>
                    <span>Username</span>
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">LOG IN</button>
            </form>
        </div>
    );
};

export default LoginForm;