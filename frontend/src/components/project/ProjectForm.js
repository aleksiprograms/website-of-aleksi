import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@material-ui/core';
import AppError from '../general/AppError';

const ProjectForm = (props) => {
    const { submit, cancel, initValues, loading, error } = props;

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
        if (initValues != null) {
            setProject(initValues);
        }
    }, [initValues]);

    return (
        <Grid container spacing={2}>
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
                                        imageOrientation: event.target.value,
                                    };
                                });
                            }}
                        >
                            <MenuItem value="landscape">Landscape</MenuItem>
                            <MenuItem value="portrait">Portrait</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
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
                            onClick={() => submit(project)}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

ProjectForm.defaultProps = {
    submit: () => {},
    cancel: () => {},
    initValues: null,
    loading: false,
    error: null,
};

export default ProjectForm;
