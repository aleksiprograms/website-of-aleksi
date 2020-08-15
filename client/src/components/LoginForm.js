import React from 'react';
import '../App.css';

const LoginForm = ({ login, onUsernameChange, onPasswordChange, username, password }) => {
    return (
        <div>
            <h3>ADMIN LOGIN</h3>
            <form onSubmit={login}>
                <div>
                    <span>Username</span>
                    <input
                        type="text"
                        value={username}
                        onChange={onUsernameChange}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>
                <button type="submit">LOG IN</button>
            </form>
        </div>
    );
};

export default LoginForm;