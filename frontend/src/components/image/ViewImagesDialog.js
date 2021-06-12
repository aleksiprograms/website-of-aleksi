import React, { useState } from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(() => ({
    container: {
        position: 'relative',
    },
    image: {
        maxWidth: '100%',
        maxHeight: 'calc(100vh - 64px)',
        verticalAlign: 'middle',
    },
    arrowButton: {
        position: 'absolute',
        top: 'calc(50% - 24px)',
    },
    arrowLeftButton: {
        left: '0px',
    },
    arrowRightButton: {
        right: '0px',
    },
    closeButton: {
        position: 'absolute',
        right: '0px',
        top: '0px',
    },
}));

const ViewImagesDialog = (props) => {
    const { open, setOpen, images } = props;

    const classes = useStyles();
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
        <Dialog onClose={close} open={open} maxWidth="md">
            <div className={classes.container}>
                <img
                    src={`/images/${images[currentImageIndex]?.image_name}`}
                    alt="Screenshot from project"
                    className={classes.image}
                />
                <div className={classes.closeButton}>
                    <IconButton color="default" onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div
                    className={`${classes.arrowButton} ${classes.arrowLeftButton}`}
                >
                    <IconButton color="default" onClick={toLeft}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>
                <div
                    className={`${classes.arrowButton} ${classes.arrowRightButton}`}
                >
                    <IconButton color="default" onClick={toRight}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
            </div>
        </Dialog>
    );
};

ViewImagesDialog.defaultProps = {
    open: false,
    setOpen: () => {},
    images: [],
};

export default ViewImagesDialog;
