import React, { useContext } from 'react';
import {
    Box,
    Typography,
    Link,
    Divider,
} from '@material-ui/core';
import { ProjectContext } from '../context/ProjectContext';
import Project from '../components/Project';

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
            {projectContext.projects.map((project) => {
                return (
                    <>
                        <Divider />
                        <Box mt={2} mb={2}>
                            <Project
                                key={project.id}
                                project={project}
                            />
                        </Box>
                    </>
                );
            })}
        </Box>
    );
};

export default ProjectsView;