import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import ProjectForm from './ProjectForm';
import ProjectsAdmin from './ProjectsAdmin';

const AdminDashboard = ({ setUser }) => {
    const [projects, setProjects] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        axios
            .get('/api/projects')
            .then(response => {
                setProjects(response.data);
            });
    }, []);

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedUser');
    }

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={logout}>LOG OUT</button>
            <button onClick={() => setShowProjectForm(true)}>ADD PROJECT</button>
            {showProjectForm === false ?
                <ProjectsAdmin projects={projects} /> :
                <ProjectForm hideForm={() => setShowProjectForm(false)}/>
            }
        </div>
    );
}

export default AdminDashboard;