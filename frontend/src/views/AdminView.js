import React, { useState, useContext } from 'react';
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
import { ProjectContext } from '../context/ProjectContext';
import useUserApi from '../hooks/useUserApi';
import useProjectApi from '../hooks/useProjectApi';
import ConfirmDialog from '../components/ConfirmDialog';

const AdminView = () => {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectContext = useContext(ProjectContext);
    const userApi = useUserApi();
    const projectApi = useProjectApi();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [projectToRemoveId, setProjectToRemoveId] = useState('');

    if (userContext.user == null) {
        return <Redirect to="/login" />;
    }

    const logout = () => {
        userApi.logout();
    };

    const add = () => {
        history.push('/create');
    };

    const edit = (project) => {
        history.push({
            pathname: '/create',
            state: { project },
        });
    };

    const remove = () => {
        projectApi.removeProject(projectToRemoveId);
        setConfirmDialogOpen(false);
    };

    const onDragEnd = (result) => {
        if (result.destination) {
            projectApi.reorderProjects(result);
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
                            {projectContext.projects.map((project, index) => {
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
                    <Grid item container justify="center">
                        <Grid container justify="space-between">
                            <Typography variant="h5">
                                Admin Dashboard
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container justify="center">
                        <Grid container justify="space-between">
                            <Typography variant="h6">Projects</Typography>
                            <Button color="primary" onClick={add}>
                                Add project
                            </Button>
                        </Grid>
                        {projectContext.loading ? (
                            <CircularProgress />
                        ) : (
                            renderProjectList()
                        )}
                    </Grid>
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
