import React, { useState } from 'react';
import { Dialog, Grid, Box, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const ViewImagesDialog = (props) => {
    const { open, setOpen, images } = props;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const close = () => {
        setOpen(false);
    };

    const toLeft = () => {
        if (currentImageIndex <= 0) {
            setCurrentImageIndex(images.length - 1);
        } else {
            setCurrentImageIndex((prevValue) => {
                return (prevValue -= 1);
            });
        }
    };

    const toRight = () => {
        if (currentImageIndex >= images.length - 1) {
            setCurrentImageIndex(0);
        } else {
            setCurrentImageIndex((prevValue) => {
                return (prevValue += 1);
            });
        }
    };

    return (
        <Dialog onClose={close} open={open} fullWidth maxWidth="md">
            <Grid container justify="flex-end" alignItems="center">
                <IconButton size="medium" onClick={close}>
                    <CloseIcon />
                </IconButton>
            </Grid>
            <img
                src={`/images/${images[currentImageIndex].image_name}`}
                alt="Screenshot from project"
            />
            <Grid container justify="center" alignItems="center">
                <IconButton onClick={toLeft}>
                    <ChevronLeftIcon />
                </IconButton>
                <Box ml={2} mr={2}>
                    <Typography>
                        {currentImageIndex + 1} / {images.length}
                    </Typography>
                </Box>
                <IconButton onClick={toRight}>
                    <ChevronRightIcon />
                </IconButton>
            </Grid>
        </Dialog>
    );
};

ViewImagesDialog.defaultProps = {
    open: false,
    setOpen: () => {},
    images: [],
};

export default ViewImagesDialog;
