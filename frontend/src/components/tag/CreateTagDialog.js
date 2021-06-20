import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@material-ui/core';
import useTagApi from '../../hooks/useTagApi';
import AppError from '../general/AppError';

const CreateTagDialog = (props) => {
    const { open, onClose, tagToEdit } = props;

    const tagApi = useTagApi();
    const [title, setTitle] = useState('');
    const [newTag, setNewTag] = useState(true);
    const [tag, setTag] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (tagToEdit != null) {
            setTitle('Edit tag');
            setNewTag(false);
            setTag(tagToEdit);
        } else {
            setTitle('Add tag');
            setNewTag(true);
            setTag({
                name: '',
                importance: '',
            });
        }
    }, [tagToEdit]);

    const onSubmit = () => {
        setLoading(true);
        if (newTag) {
            let tagToAdd = tag;
            tagApi
                .getMaxPlaceOfTags()
                .then((result) => {
                    tagToAdd.place = Number(result.data.max) + 1;
                    return tagApi.addTag(tagToAdd);
                })
                .then(() => {
                    setTag(null);
                    onClose();
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            tagApi
                .editTag(tag)
                .then(() => {
                    setTag(null);
                    onClose();
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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            label="Name"
                            value={tag?.name}
                            onChange={(event) => {
                                event.persist();
                                setTag((prevState) => {
                                    return {
                                        ...prevState,
                                        name: event.target.value,
                                    };
                                });
                            }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Importance</InputLabel>
                            <Select
                                value={tag?.importance}
                                label="Importance"
                                onChange={(event) => {
                                    event.persist();
                                    setTag((prevState) => {
                                        return {
                                            ...prevState,
                                            importance: event.target.value,
                                        };
                                    });
                                }}
                            >
                                <MenuItem value="primary">Primary</MenuItem>
                                <MenuItem value="secondary">Secondary</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {error && (
                        <Grid item>
                            <AppError error={error} />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                {loading && <CircularProgress size={20} />}
                <Button color="secondary" disabled={loading} onClick={onClose}>
                    Cancel
                </Button>
                <Button color="primary" disabled={loading} onClick={onSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTagDialog;
