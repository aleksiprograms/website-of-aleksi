import React, { useState, useEffect } from 'react';
import projectService from '../../services/projects';
import styled from 'styled-components';
import ProjectForm from './ProjectForm';
import AllProjectsAdmin from './AllProjectsAdmin';

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
`;

const Title = styled.h2`
    color: #000;
    font-size: 2rem;
`;

const Button = styled.button`
    color: #fff;
    background-color: #111;
    text-decoration: none;
    font-size: 1rem;
    border: 0.20rem solid #f00;
    border-radius: 0.5rem;
    width: 7rem;
    height: 2.3rem;

    &:hover {
        background-color: #f00;
    }
`;

const AdminDashboard = ({ setUpUser }) => {
    const [projects, setProjects] = useState([]);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setProjects(await projectService.getAll());
        }
        fetchData();
    }, []);

    const logout = () => {
        setUpUser(null);
        window.localStorage.removeItem('loggedUser');
    }

    const setUpProjectForm = (project) => {
        setProjectToEdit(project);
        setShowProjectForm(true);
    }

    const addProject = (project) => {
        setShowProjectForm(false);
        setProjects(prevItems => {
            return [...prevItems, project];
        });
    }

    const editProject = (project) => {
        setShowProjectForm(false);
        let index = projects.findIndex(item => item.id === project.id);
        setProjects(prevItems => {
            prevItems[index] = project;
            return prevItems;
        });
    }

    const removeProject = (project) => {
        setProjects(prevItems => {
            return prevItems.filter(item => item.id !== project.id);
        });
    }

    return (
        <div>
            <TitleContainer>
                <Title>Admin Dashboard</Title>
                <Button onClick={logout}>LOG OUT</Button>
            </TitleContainer>
            {showProjectForm === false ?
                <AllProjectsAdmin
                    projects={projects}
                    setUpProjectForm={setUpProjectForm}
                    addProject={addProject}
                    editProject={editProject}
                    removeProject={removeProject}
                />
                :
                <ProjectForm
                    projectToEdit={projectToEdit}
                    hideForm={() => setShowProjectForm(false)}
                    addProject={addProject}
                    editProject={editProject}
                />
            }
        </div>
    );
}

export default AdminDashboard;