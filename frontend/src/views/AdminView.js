import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Button,
    CircularProgress,
} from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import ProjectList from '../components/project/ProjectList';
import useProjectApi from '../hooks/useProjectApi';
import ConfirmDialog from '../components/general/ConfirmDialog';
import AppError from '../components/general/AppError';

const AdminView = () => {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectApi = useProjectApi();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [projectToRemoveId, setProjectToRemoveId] = useState('');

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

    if (userContext.user == null) {
        return <Redirect to="/login" />;
    }

    const logout = () => {
        userContext.onLogout();
    };

    const tags = () => {
        history.push('/tags');
    };

    const addProject = () => {
        history.push('/create-project');
    };

    const editProject = (projectId) => {
        history.push('/create-project/' + projectId);
    };

    const confirmRemoveProject = (projectId) => {
        setProjectToRemoveId(projectId);
        setConfirmDialogOpen(true);
    };

    const removeProject = () => {
        setConfirmDialogOpen(false);
        setLoading(true);
        projectApi
            .removeProject(projectToRemoveId)
            .then(() => {
                return projectApi.getProjects();
            })
            .then((result) => {
                setProjects(result.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const reorderProjects = (result) => {
        if (result.destination) {
            setLoading(true);
            const tmpProjects = projects;
            const [reorderedProjects] = tmpProjects.splice(
                result.source.index,
                1
            );
            tmpProjects.splice(result.destination.index, 0, reorderedProjects);
            let calls = [];
            for (let i = 0; i < tmpProjects.length; i++) {
                let project = {
                    ...tmpProjects[i],
                    placeInProjects: i + 1,
                };
                calls[i] = projectApi.editProject(project);
            }
            Promise.all(calls)
                .then(() => {
                    return projectApi.getProjects();
                })
                .then((result) => {
                    setProjects(result.data);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item container justify="space-between">
                    <Typography variant="h5">Admin Dashboard</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Grid>
                <Grid item container>
                    <Grid container justify="space-between">
                        <Typography variant="h6">Projects</Typography>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={tags}
                                    >
                                        Tags
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={addProject}
                                    >
                                        Add project
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {loading ? (
                        <Grid container justify="center">
                            <Box mt={2}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    ) : (
                        <ProjectList
                            projects={projects}
                            editProject={editProject}
                            confirmRemoveProject={confirmRemoveProject}
                            reorderProjects={reorderProjects}
                        />
                    )}
                </Grid>
                {error && (
                    <Grid item container>
                        <AppError error={error} />
                    </Grid>
                )}
            </Grid>
            <ConfirmDialog
                open={confirmDialogOpen}
                text="Are you sure you want to delete this project?"
                onConfirm={removeProject}
                onCancel={() => setConfirmDialogOpen(false)}
            />
        </>
    );
};

export default AdminView;
