import React, { useContext } from 'react';
import {
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';

const ProjectsView = () => {

    const projectContext = useContext(ProjectContext);

    return (
        <Box mt={2} mb={2}>
            <Box>
                <Typography variant="h4">
                    Projects
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography>
                    Here are my most interesting personal projects.
                    Here is a link to my <Link
                        href="https://github.com/aleksiprograms"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub profile
                    </Link>.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {projectContext.projects.map((project) => {
                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ProjectsView;