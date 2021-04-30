import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
    Grid,
    Typography,
    Button,
    Chip,
    CircularProgress,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { UserContext } from '../context/UserContext';
import useTagApi from '../hooks/useTagApi';
import CreateTagDialog from '../components/tag/CreateTagDialog';
import AppError from '../components/general/AppError';

const TagsView = () => {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const tagApi = useTagApi();
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [createTagDialogOpen, setCreateTagDialogOpen] = useState(false);
    const [tagToEdit, setTagToEdit] = useState(null);

    useEffect(() => {
        if (!createTagDialogOpen) {
            setLoading(true);
            tagApi
                .getTags()
                .then((result) => {
                    setTags(result.data);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [createTagDialogOpen]);

    if (userContext.user == null) {
        return <Redirect to="/login" />;
    }

    const back = () => {
        history.push('/admin');
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item container justify="space-between">
                    <Typography variant="h5">Tags</Typography>
                    <Button
                        color="primary"
                        onClick={() => {
                            setTagToEdit(null);
                            setCreateTagDialogOpen(true);
                        }}
                    >
                        New tag
                    </Button>
                </Grid>
                {loading ? (
                    <Grid item container justify="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <Grid item container justify="center" spacing={2}>
                        {tags.map((tag) => {
                            return (
                                <Grid item>
                                    <Chip
                                        icon={<EditIcon />}
                                        label={tag.name}
                                        color={tag.importance}
                                        variant="outlined"
                                        onClick={() => {
                                            setTagToEdit(tag);
                                            setCreateTagDialogOpen(true);
                                        }}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
                {error && (
                    <Grid item container>
                        <AppError error={error} />
                    </Grid>
                )}
                <Grid item container justify="center" spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={back}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <CreateTagDialog
                open={createTagDialogOpen}
                onClose={() => setCreateTagDialogOpen(false)}
                tagToEdit={tagToEdit}
            />
        </>
    );
};

export default TagsView;
