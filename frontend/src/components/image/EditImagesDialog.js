import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
} from '@material-ui/core';
import DragDropList from '../general/DragDropList';

const EditImagesDialog = (props) => {
    const { open, setOpen, initImages, setFinalImages } = props;

    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(initImages);
    }, []);

    const onImagesChange = (event) => {
        let files = Array.from(event.target.files);
        files = files.map((file) => {
            return {
                file: file,
                id: file.name + file.lastModified + '',
                content: (
                    <div style={{ width: '100%' }}>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="File"
                            style={{ height: 70 }}
                        />
                    </div>
                ),
            };
        });
        setImages((prevFiles) => {
            return [...prevFiles, ...files];
        });
    };

    const deleteImage = (id) => {
        setImages((prevImages) => {
            return prevImages.filter((pi) => pi.id !== id);
        });
    };

    const reorderImages = (result) => {
        if (result.destination) {
            const tmpImages = images;
            const [reorderedImages] = tmpImages.splice(result.source.index, 1);
            tmpImages.splice(result.destination.index, 0, reorderedImages);
            setImages(tmpImages);
        }
    };

    const cancel = () => {
        setImages(initImages);
        setOpen(false);
    };

    const save = () => {
        setFinalImages(images);
        setOpen(false);
    };

    return (
        <Dialog onClose={cancel} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Edit images</DialogTitle>
            <DialogContent>
                <DragDropList
                    id="droppableImages"
                    items={images}
                    onReorder={reorderImages}
                    onRemove={deleteImage}
                />
            </DialogContent>
            <DialogActions>
                <label htmlFor="button-choose-files">
                    <input
                        id="button-choose-files"
                        style={{ display: 'none' }}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onImagesChange}
                    />
                    <Button variant="outlined" color="primary" component="span">
                        Choose images
                    </Button>
                </label>
                <Button color="secondary" onClick={cancel}>
                    Cancel
                </Button>
                <Button color="primary" onClick={save}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EditImagesDialog.defaultProps = {
    open: false,
    setOpen: () => {},
    initImages: [],
    setFinalImages: () => {},
};

export default EditImagesDialog;
