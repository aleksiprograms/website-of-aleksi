import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Button,
    Chip,
    CircularProgress,
} from '@material-ui/core';
import AppError from '../general/AppError';

const ProjectForm = (props) => {
    const { allTags, submit, cancel, initValues, loading, error } = props;

    const [project, setProject] = useState({
        title: '',
        text: '',
    });
    const [tags, setTags] = useState(allTags);

    useEffect(() => {
        setTags(
            allTags.map((tag) => {
                let selected = initValues?.tags.find((t) => t.id === tag.id);
                return {
                    ...tag,
                    selected: selected != null,
                    inDB: selected != null,
                    project_tag_id: selected ? selected.project_tag_id : null,
                };
            })
        );
    }, [allTags, initValues]);

    useEffect(() => {
        if (initValues != null) {
            setProject(initValues);
        }
    }, [initValues]);

    const toggleTag = (id) => {
        setTags((prevTags) => {
            return prevTags.map((tag) => {
                if (tag.id === id) {
                    return {
                        ...tag,
                        selected: !tag.selected,
                    };
                } else {
                    return tag;
                }
            });
        });
    };

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
                    rows={5}
                    rowsMax={15}
                />
            </Grid>
            <Grid item container justify="center" spacing={1}>
                {tags.map((tag) => {
                    return (
                        <Grid item>
                            <Chip
                                label={tag.name}
                                color={tag.importance}
                                variant={tag.selected ? 'default' : 'outlined'}
                                size="small"
                                onClick={() => {
                                    toggleTag(tag.id);
                                }}
                            />
                        </Grid>
                    );
                })}
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
                            onClick={() => submit(project, tags)}
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
