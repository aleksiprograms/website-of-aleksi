import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context/UserContext';
import useProjectApi from '../hooks/useProjectApi';

const useStyles = makeStyles((theme) => ({
    field: {
        width: "100%",
    },
}));

const CreateView = () => {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectApi = useProjectApi();
    const [title, setTitle] = useState("");
    const [project, setProject] = useState({
        title: '',
        text: '',
        platforms: '',
        technologies: '',
        githubUrl: '',
        imageUrl: '',
        imageOrientation: '',
        placeInProjects: ''
    });

    useEffect(() => {
        if (location.state != null) {
            setTitle("Edit project");
            setProject(location.state.project);
        } else {
            setTitle("Add project");
        }
    }, [location.state]);

    if (userContext.user == null) {
        return (
            <Redirect to="/login" />
        );
    }

    const submit = () => {
        if (location.state != null) {
            projectApi.editProject(project);
        } else {
            projectApi.addProject(project);
        }
        history.push("/admin");
    }

    const cancel = () => {
        history.push("/admin");
    }

    return (
        <Box mt={2} mb={2}>
            <Grid container spacing={2}>
                <Grid item container>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                </Grid>
                <Grid item container>
                    <TextField
                        label="Title"
                        value={project.title}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, title: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        autoFocus
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Text"
                        value={project.text}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, text: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        multiline
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Platforms"
                        value={project.platforms}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, platforms: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Technologies"
                        value={project.technologies}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, technologies: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Github Url"
                        value={project.githubUrl}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, githubUrl: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Image Url"
                        value={project.imageUrl}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, imageUrl: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Image Orientation"
                        value={project.imageOrientation}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, imageOrientation: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container>
                    <TextField
                        label="Place In Projects"
                        value={project.placeInProjects}
                        onChange={(event) => {
                            event.persist();
                            setProject(prevState => {
                                return { ...prevState, placeInProjects: event.target.value }
                            });
                        }}
                        fullWidth
                        variant="outlined"
                        type="number"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container justify="center" spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submit}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreateView;