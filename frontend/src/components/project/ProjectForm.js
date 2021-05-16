import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Button,
    Chip,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import AppError from '../general/AppError';
import EditImagesDialog from '../image/EditImagesDialog';

const ProjectForm = (props) => {
    const { allTags, submit, cancel, initValues, loading, error } = props;

    const [project, setProject] = useState({
        title: '',
        text: '',
    });
    const [tags, setTags] = useState(allTags);
    const [images, setImages] = useState([]);
    const [editImagesDialogOpen, setEditImagesDialogOpen] = useState(false);

    useEffect(() => {
        setImages(
            initValues?.images.map((image) => {
                return {
                    ...image,
                    inDB: true,
                };
            })
        );
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

    const renderImage = (image) => {
        if (image.remove) {
            return null;
        } else if (image.inDB) {
            return getImage(image.id, `/images/${image.image_name}`);
        } else {
            return getImage(image.id, URL.createObjectURL(image.file));
        }
    };

    const getImage = (id, src) => {
        return (
            <Grid item key={id}>
                <img src={src} alt="File" style={{ height: 70 }} />
            </Grid>
        );
    };

    return (
        <>
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
                        rows={3}
                        rowsMax={15}
                    />
                </Grid>
                <Grid item container>
                    {images == null || images?.length === 0 ? (
                        <Typography>No images chosen</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {images.map((image) => (
                                <>{renderImage(image)}</>
                            ))}
                        </Grid>
                    )}
                </Grid>
                <Grid item container justify="flex-end">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setEditImagesDialogOpen(true)}
                    >
                        Edit images
                    </Button>
                </Grid>
                <Grid item container justify="center" spacing={1}>
                    {tags.map((tag) => {
                        return (
                            <Grid item key={tag.id}>
                                <Chip
                                    label={tag.name}
                                    color={tag.importance}
                                    variant={
                                        tag.selected ? 'default' : 'outlined'
                                    }
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
                                onClick={() => submit(project, images, tags)}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <EditImagesDialog
                open={editImagesDialogOpen}
                setOpen={setEditImagesDialogOpen}
                initImages={images}
                setFinalImages={setImages}
            />
        </>
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
