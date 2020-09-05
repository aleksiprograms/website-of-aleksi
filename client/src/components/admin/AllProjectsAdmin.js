import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProjectAdmin from './ProjectAdmin';

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
`;

const Title = styled.h2`
    color: #000;
    font-size: 1.8rem;
`;

const Button = styled.button`
    color: #fff;
    background-color: #111;
    text-decoration: none;
    font-size: 1rem;
    border: 0.20rem solid #00f;
    border-radius: 0.5rem;
    width: 11.7rem;
    height: 2.3rem;

    &:hover {
        background-color: #00f;
    }
`;

const AllProjectsAdmin = ({ setUpProjectForm }) => {
    const projects = useSelector(state => state.projects);

    return (
        <div>
            <TitleContainer>
                <Title>Projects</Title>
                <Button onClick={() => setUpProjectForm(null)}>ADD PROJECT</Button>
            </TitleContainer>
            {projects.map((project) => (
                <ProjectAdmin
                    key={project.id}
                    project={project}
                    setUpProjectForm={setUpProjectForm}
                />
            ))}
        </div>
    );
};

export default AllProjectsAdmin;