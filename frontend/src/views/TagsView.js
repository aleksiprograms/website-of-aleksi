import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
    Grid,
    Typography,
    Button,
    Chip,
    CircularProgress,
} from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import useTagApi from '../hooks/useTagApi';
import DragDropList from '../components/general/DragDropList';
import CreateTagDialog from '../components/tag/CreateTagDialog';
import ConfirmDialog from '../components/general/ConfirmDialog';
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
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [tagToRemoveId, setTagToRemoveId] = useState('');

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

    const editTag = (tagId) => {
        setTagToEdit(tags.find((tag) => tag.id === tagId));
        setCreateTagDialogOpen(true);
    };

    const confirmRemoveTag = (tagId) => {
        setTagToRemoveId(tagId);
        setConfirmDialogOpen(true);
    };

    const removeTag = () => {
        setConfirmDialogOpen(false);
        setLoading(true);
        tagApi
            .removeTag(tagToRemoveId)
            .then(() => {
                return tagApi.getTags();
            })
            .then((result) => {
                setTags(result.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const reorderTags = (result) => {
        if (result.destination) {
            setLoading(true);
            const tmpTags = tags;
            const [reorderedTags] = tmpTags.splice(result.source.index, 1);
            tmpTags.splice(result.destination.index, 0, reorderedTags);
            let promises = [];
            for (let i = 0; i < tmpTags.length; i++) {
                let tag = { ...tmpTags[i], place: i + 1 };
                promises[i] = tagApi.editTag(tag);
            }
            Promise.all(promises)
                .then(() => {
                    return tagApi.getTags();
                })
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
    };

    const tagsForList = () => {
        return tags.map((tag) => {
            return {
                ...tag,
                content: (
                    <div style={{ width: '100%' }}>
                        <Chip
                            label={tag?.name}
                            color={tag?.importance}
                            variant="outlined"
                            size="small"
                        />
                    </div>
                ),
            };
        });
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
                        Add tag
                    </Button>
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
                    <DragDropList
                        droppableId="droppableTags"
                        items={tagsForList()}
                        onReorder={reorderTags}
                        onEdit={editTag}
                        onRemove={confirmRemoveTag}
                    />
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
            <ConfirmDialog
                open={confirmDialogOpen}
                text="Are you sure you want to delete this tag?"
                onConfirm={removeTag}
                onCancel={() => setConfirmDialogOpen(false)}
            />
        </>
    );
};

export default TagsView;
