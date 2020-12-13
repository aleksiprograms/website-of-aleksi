import React, { useContext } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { ProjectContext } from '../context/ProjectContext';
import useUserApi from '../hooks/useUserApi';
import ProjectAdmin from '../components/ProjectAdmin';

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

const AdminView = () => {

    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectContext = useContext(ProjectContext);
    const userApi = useUserApi();

    if (userContext.user == null) {
        return (
            <Redirect to="/login" />
        );
    }

    const logout = () => {
        userApi.logout();
    }

    const add = () => {
        history.push('/create');
    }

    return (
        <div>
            <TitleContainer>
                <Title>Admin Dashboard</Title>
                <Button onClick={logout}>LOG OUT</Button>
            </TitleContainer>
            <div>
                <TitleContainer>
                    <Title>Projects</Title>
                    <Button onClick={add}>ADD PROJECT</Button>
                </TitleContainer>
                {projectContext.projects.map((project) => {
                    return (
                        <ProjectAdmin
                            key={project.id}
                            project={project}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default AdminView;