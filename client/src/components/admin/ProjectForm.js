import React, { useState } from 'react';

const ProjectForm = ({ hideForm }) => {
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

    const submit = (event) => {
        event.preventDefault();
        hideForm();
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <span>Title</span>
                    <input
                        type="text"
                        value={project.title}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, title: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Text</span>
                    <textarea
                        rows="4"
                        cols="50"
                        type="text"
                        value={project.text}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, text: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Platforms</span>
                    <input
                        type="text"
                        value={project.platforms}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, platforms: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Technologies</span>
                    <input
                        type="text"
                        value={project.technologies}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, technologies: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Github Url</span>
                    <input
                        type="text"
                        value={project.githubUrl}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, githubUrl: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Image Url</span>
                    <input
                        type="text"
                        value={project.imageUrl}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, imageUrl: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Image Orientation</span>
                    <input
                        type="text"
                        value={project.imageOrientation}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, imageOrientation: target.value }
                            });
                        }}
                    />
                </div>
                <div>
                    <span>Place In Projects</span>
                    <input
                        type="text"
                        value={project.placeInProjects}
                        onChange={({ target }) => {
                            setProject(prevState => {
                                return { ...prevState, placeInProjects: target.value }
                            });
                        }}
                    />
                </div>
                <button onClick={hideForm}>CANCEL</button>
                <button type="submit">SAVE</button>
            </form>
        </div>
    );
};

export default ProjectForm;