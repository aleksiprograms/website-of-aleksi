import React, { useContext } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import {
    Box,
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from '../context/UserContext';
import { ProjectContext } from '../context/ProjectContext';
import useUserApi from '../hooks/useUserApi';
import useProjectApi from '../hooks/useProjectApi';

const AdminView = () => {

    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectContext = useContext(ProjectContext);
    const userApi = useUserApi();
    const projectApi = useProjectApi();

    if (userContext.user == null) {
        return (
            <Redirect to="/login" />
        );
    }

    const logout = () => {
        userApi.logout();
    }

    const add = () => {
        history.push('/create');
    }

    const edit = (project) => {
        history.push({
            pathname: '/create',
            state: { project }
        });
    }

    const remove = (id) => {
        projectApi.removeProject(id);
    }

    return (
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
                        <Typography variant="h6">
                            Projects
                        </Typography>
                        <Button
                            color="primary"
                            onClick={add}
                        >
                            Add project
                        </Button>
                    </Grid>
                    <List style={{ width: "100%" }} disablePadding>
                        {projectContext.projects.map((project) => {
                            return (
                                <ListItem key={project.id} disableGutters>
                                    <ListItemText
                                        primary={project.title}
                                    />
                                    <ListItemSecondaryAction>
                                        <>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    onClick={() => edit(project)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => remove(project.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminView;