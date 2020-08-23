import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AllProjects from '../components/AllProjects';

const Title = styled.h2`
    color: #000;
    font-size: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
`;

const Text = styled.p`
    color: #000;
    font-size: 1rem;
`;

const Link = styled.a`
    color: #f00;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

const BottomMargin = styled.div`
    margin-bottom: 1rem;
`;

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
            <Title>Projects</Title>
            <Text>
                Here are descriptions of my most interesting personal projects,
                their Github links and what technologies I use in them.
                You can check my <Link className="link" href="https://github.com/aleksiprograms" target="_blank">Github profile</Link> to
                see rest of my projects.
            </Text>
            <AllProjects projects={projects} />
            <BottomMargin />
        </div>
    );
};

export default ProjectsPage;