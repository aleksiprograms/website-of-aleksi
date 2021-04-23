import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
    CircularProgress,
} from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { UserContext } from '../context/UserContext';
import useProjectApi from '../hooks/useProjectApi';
import ConfirmDialog from '../components/ConfirmDialog';
import AppError from '../components/AppError';

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

    const add = () => {
        history.push('/create');
    };

    const edit = (project) => {
        history.push('/create/' + project.id);
    };

    const remove = () => {
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

    const onDragEnd = (result) => {
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

    const renderProjectList = () => {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppableProjects">
                    {(provided) => (
                        <List
                            style={{ width: '100%' }}
                            disablePadding
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {projects.map((project, index) => {
                                return renderProject(project, index);
                            })}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const renderProject = (project, index) => {
        return (
            <Draggable
                key={project.id}
                draggableId={project.id + ''}
                index={index}
            >
                {(provided) => (
                    <ListItem
                        disableGutters
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <ListItemIcon {...provided.dragHandleProps}>
                            <DragIndicatorIcon />
                        </ListItemIcon>
                        <ListItemText primary={project.title} />
                        <ListItemIcon>
                            <Tooltip title="Edit">
                                <IconButton onClick={() => edit(project)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemIcon>
                            <Tooltip title="Delete">
                                <IconButton
                                    edge="end"
                                    onClick={() => {
                                        setProjectToRemoveId(project.id);
                                        setConfirmDialogOpen(true);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>
                    </ListItem>
                )}
            </Draggable>
        );
    };

    return (
        <>
            <Box mt={2} mb={2}>
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
                            <Button color="primary" onClick={add}>
                                Add project
                            </Button>
                        </Grid>
                        {loading ? (
                            <Grid container justify="center">
                                <Box mt={2}>
                                    <CircularProgress />
                                </Box>
                            </Grid>
                        ) : (
                            renderProjectList()
                        )}
                    </Grid>
                    {error && (
                        <Grid item container>
                            <AppError error={error} />
                        </Grid>
                    )}
                </Grid>
            </Box>
            <ConfirmDialog
                open={confirmDialogOpen}
                onCancel={() => setConfirmDialogOpen(false)}
                onConfirm={remove}
                text="Are you sure you want to delete this project?"
            />
        </>
    );
};

export default AdminView;
