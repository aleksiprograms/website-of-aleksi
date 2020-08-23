import React, { useState, useEffect } from 'react';
import projectService from '../../services/projects';
import styled from 'styled-components';

const Title = styled.h2`
    margin-top: 1rem;
    color: #000;
    font-size: 1.5rem;
`;

const FormRow = styled.div`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    margin-top: 0.3rem;
`;

const InputTitle = styled.p`
    color: #000;
    font-size: 1rem;
`;

const Input = styled.input`
    color: #000;
    font-size: 0.85rem;
    width: 100%;
`;

const TextArea = styled.textarea`
    color: #000;
    font-size: 0.85rem;
    width: 100%;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
    margin-left: 1rem;

    &:hover {
        background-color: #00f;
    }
`;

const ButtonRed = styled(Button)`
    border: 0.20rem solid #f00;

    &:hover {
        background-color: #f00;
    }
`;

const ProjectForm = ({ projectToEdit, hideForm, addProject, editProject }) => {
    const [title, setTitle] = useState("");
    const [project, setProject] = useState({
        title: '',
        text: '',
        platforms: '',
        technologies: '',
        githubUrl: '',
        imageUrl: '',
        imageOrientation: '',
        placeInProjects: ''
    });

    useEffect(() => {
        if (projectToEdit !== null) {
            setTitle("Edit project");
            setProject(projectToEdit);
        } else {
            setTitle("Add project");
        }
    }, [projectToEdit]);

    const submit = async (event) => {
        event.preventDefault();
        if (projectToEdit !== null) {
            await projectService.update(project);
            editProject(project);
        } else {
            let result = await projectService.create(project);
            project.id = result.id;
            addProject(project);
        }
    }

    return (
        <div>
            <Title>{title}</Title>
            <form onSubmit={submit}>
                <FormRow>
                    <InputTitle>Title</InputTitle>
                    <Input
                        type="text"
                        value={project.title}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, title: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Text</InputTitle>
                    <TextArea
                        style={{ resize: "none" }}
                        rows="10"
                        type="text"
                        value={project.text}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, text: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Platforms</InputTitle>
                    <Input
                        type="text"
                        value={project.platforms}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, platforms: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Technologies</InputTitle>
                    <Input
                        type="text"
                        value={project.technologies}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, technologies: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Github Url</InputTitle>
                    <Input
                        type="text"
                        value={project.githubUrl}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, githubUrl: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Image Url</InputTitle>
                    <Input
                        type="text"
                        value={project.imageUrl}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, imageUrl: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Image Orientation</InputTitle>
                    <Input
                        type="text"
                        value={project.imageOrientation}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, imageOrientation: target.value }
                            });
                        }}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Place In Projects</InputTitle>
                    <Input
                        type="text"
                        value={project.placeInProjects}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, placeInProjects: target.value }
                            });
                        }}
                    />
                </FormRow>
                <ButtonsContainer>
                    <ButtonRed onClick={hideForm}>CANCEL</ButtonRed>
                    <ButtonBlue type="submit">SAVE</ButtonBlue>
                </ButtonsContainer>
            </form>
        </div>
    );
};

export default ProjectForm;