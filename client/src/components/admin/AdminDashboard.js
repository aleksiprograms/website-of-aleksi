import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/authActions';
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

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);

    const logout = () => {
        dispatch(logOut());
    }

    const setUpProjectForm = (project) => {
        setProjectToEdit(project);
        setShowProjectForm(true);
    }

    return (
        <div>
            <TitleContainer>
                <Title>Admin Dashboard</Title>
                <Button onClick={logout}>LOG OUT</Button>
            </TitleContainer>
            {showProjectForm === false ?
                <AllProjectsAdmin
                    setUpProjectForm={setUpProjectForm}
                />
                :
                <ProjectForm
                    projectToEdit={projectToEdit}
                    hideForm={() => setShowProjectForm(false)}
                />
            }
        </div>
    );
}

export default AdminDashboard;