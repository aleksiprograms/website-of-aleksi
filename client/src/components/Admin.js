import React from 'react';
import '../App.css';

const Admin = ({ logout }) => {
    return (
        <div>
            LOGGED IN
            <button onClick={logout}>
                LOG OUT
            </button>
        </div>
    );
}

export default Admin;