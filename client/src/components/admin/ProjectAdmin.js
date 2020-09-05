import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeProject } from '../../redux/actions/projectActions';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
`;

const Title = styled.h3`
    color: #000;
    font-size: 1.3rem;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    color: #fff;
    background-color: #111;
    text-decoration: none;
    font-size: 1rem;
    border-radius: 0.5rem;
    width: 5.6rem;
    height: 2.3rem;
`;

const ButtonBlue = styled(Button)`
    border: 0.20rem solid #00f;

    &:hover {
        background-color: #00f;
    }
`;

const ButtonRed = styled(Button)`
    margin-left: 0.5rem;
    border: 0.20rem solid #f00;

    &:hover {
        background-color: #f00;
    }
`;

const ProjectAdmin = (props) => {
    const dispatch = useDispatch();
    const [project] = useState(props.project);

    const edit = () => {
        props.setUpProjectForm(project);
    }

    const remove = () => {
        dispatch(removeProject(project.id));
    }

    return (
        <Container>
            <Title>{project.title}</Title>
            <ButtonsContainer>
                <ButtonBlue onClick={edit}>EDIT</ButtonBlue>
                <ButtonRed onClick={remove}>DELETE</ButtonRed>
            </ButtonsContainer>
        </Container>
    );
};

export default ProjectAdmin;