import React, { useEffect, useState } from 'react';
import { Grid, Typography, Link, CircularProgress } from '@material-ui/core';
import useProjectApi from '../hooks/useProjectApi';
import ProjectCard from '../components/project/ProjectCard';
import AppError from '../components/general/AppError';

const ProjectsView = () => {
    const projectApi = useProjectApi();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        projectApi
            .getProjects()
            .then((result) => {
                setProjects(result.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const renderProjectCard = (project) => {
        return (
            <Grid
                item
                xs={12}
                sm={project.imageOrientation === 'portrait' ? 6 : 12}
                style={{ flexGrow: 1, height: '100%' }}
            >
                <ProjectCard key={project.id} project={project} />
            </Grid>
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item>
                <>
                    <Typography variant="h4">Projects</Typography>
                    <Typography>
                        Here are my most interesting personal projects. Here is
                        a link to my{' '}
                        <Link
                            href="https://github.com/aleksiprograms"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub profile
                        </Link>
                        .
                    </Typography>
                </>
            </Grid>
            {error && (
                <Grid item container>
                    <AppError error={error} />
                </Grid>
            )}
            {loading ? (
                <Grid item container justify="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <>{projects.map((project) => renderProjectCard(project))}</>
            )}
        </Grid>
    );
};

export default ProjectsView;
