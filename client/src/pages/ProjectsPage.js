import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Projects from '../components/Projects';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get('/api/projects')
            .then(response => {
                setProjects(response.data);
            });
    }, []);

    return (
        <div>
            <h2 className="pageTitle">Projects</h2>
            <p className="mainText">
                Here are descriptions of my most interesting personal projects,
                their Github links and what technologies I use in them.
                You can check my <a className="link" href="https://github.com/aleksiprograms" target="_blank">Github profile</a> to
                see rest of my projects.
            </p>
            <Projects projects={projects} />
            <div className="projectsBottomMargin" />
        </div>
    );
};

export default ProjectsPage;