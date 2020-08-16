import React from 'react';
import '../../App.css';
import ProjectForm from './ProjectForm';

const AdminDashboard = ({ logout }) => {
    return (
        <div>
            <button onClick={logout}>LOG OUT</button>
            <ProjectForm />
        </div>
    );
}

export default AdminDashboard;