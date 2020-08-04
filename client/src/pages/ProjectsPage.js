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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque fringilla lacus non tellus ultricies varius sit amet
                eget <a className="link" href="https://github.com/aleksiprograms" target="_blank">Github profile</a> nulla.
                Vestibulum ante ipsum primis in faucibus orci luctus
                et ultrices posuere cubilia curae; Vivamus in odio id libero
                ornare imperdiet eget non neque. Sed semper felis neque,
                molestie aliquam tortor condimentum.
            </p>
            <Projects projects={projects} />
            <div className="projectsBottom" />
        </div>
    );
};

export default ProjectsPage;