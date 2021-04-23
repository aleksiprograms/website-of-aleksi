import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import useProjectApi from '../hooks/useProjectApi';
import AppError from '../components/AppError';

const CreateView = (props) => {
    const { match } = props;

    const history = useHistory();
    const userContext = useContext(UserContext);
    const projectApi = useProjectApi();
    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [project, setProject] = useState({
        title: '',
        text: '',
        platforms: '',
        technologies: '',
        githubUrl: '',
        imageUrl: '',
        imageOrientation: 'none',
    });

    useEffect(() => {
        if (match.params.id != null) {
            setTitle('Edit project');
            setInitLoading(true);
            setError(null);
            projectApi
                .getProject(match.params.id)
                .then((result) => {
                    setProject(result.data);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setInitLoading(false);
                });
        } else {
            setTitle('Add project');
        }
    }, []);

    if (userContext.user == null) {
        return <Redirect to="/login" />;
    }

    const submit = () => {
        if (match.params.id != null) {
            projectApi
                .editProject(project)
                .then(() => {
                    history.push('/admin');
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            projectApi
                .countProjects()
                .then((result) => {
                    project.placeInProjects = Number(result.data.count) + 1;
                    return projectApi.addProject(project);
                })
                .then(() => {
                    history.push('/admin');
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const cancel = () => {
        history.push('/admin');
    };

    return (
        <Box mt={2} mb={2}>
            <Grid container spacing={2}>
                <Grid item container>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                {initLoading ? (
                    <Grid item container justify="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        <Grid item container>
                            <TextField
                                label="Title"
                                value={project.title}
                                onChange={(event) => {
                                    event.persist();
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            title: event.target.value,
                                        };
                                    });
                                }}
                                fullWidth
                                variant="outlined"
                                autoFocus
                            />
                        </Grid>
                        <Grid item container>
                            <TextField
                                label="Text"
                                value={project.text}
                                onChange={(event) => {
                                    event.persist();
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            text: event.target.value,
                                        };
                                    });
                                }}
                                fullWidth
                                variant="outlined"
                                multiline
                            />
                        </Grid>
                        <Grid item container>
                            <TextField
                                label="Platforms"
                                value={project.platforms}
                                onChange={(event) => {
                                    event.persist();
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            platforms: event.target.value,
                                        };
                                    });
                                }}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item container>
                            <TextField
                                label="Technologies"
                                value={project.technologies}
                                onChange={(event) => {
                                    event.persist();
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            technologies: event.target.value,
                                        };
                                    });
                                }}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item container>
                            <TextField
                                label="GitHub Url"
                                value={project.githubUrl}
                                onChange={(event) => {
                                    event.persist();
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            githubUrl: event.target.value,
                                        };
                                    });
                                }}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item container>
                            <TextField
                                label="Image Url"
                                value={project.imageUrl}
                                onChange={(event) => {
                                    event.persist();
                                    setProject((prevState) => {
                                        return {
                                            ...prevState,
                                            imageUrl: event.target.value,
                                        };
                                    });
                                    if (event.target.value === '') {
                                        setProject((prevState) => {
                                            return {
                                                ...prevState,
                                                imageOrientation: 'none',
                                            };
                                        });
                                    }
                                    if (
                                        event.target.value !== '' &&
                                        project.imageOrientation === 'none'
                                    ) {
                                        setProject((prevState) => {
                                            return {
                                                ...prevState,
                                                imageOrientation: 'landscape',
                                            };
                                        });
                                    }
                                }}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        {project?.imageUrl?.length > 0 && (
                            <Grid item container>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Image Orientation</InputLabel>
                                    <Select
                                        value={project.imageOrientation}
                                        label="Image Orientation"
                                        onChange={(event) => {
                                            event.persist();
                                            setProject((prevState) => {
                                                return {
                                                    ...prevState,
                                                    imageOrientation:
                                                        event.target.value,
                                                };
                                            });
                                        }}
                                    >
                                        <MenuItem value="landscape">
                                            Landscape
                                        </MenuItem>
                                        <MenuItem value="portrait">
                                            Portrait
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </>
                )}
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
                )}
            </Grid>
        </Box>
    );
};

export default CreateView;
