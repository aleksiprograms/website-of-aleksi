import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
} from '@material-ui/core';

const ConfirmDialog = (props) => {
    const { open, text, onConfirm, onCancel } = props;

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button color="primary" onClick={onConfirm}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDialog.defaultProps = {
    open: false,
    text: 'Are you sure?',
    onConfirm: () => {},
    onCancel: () => {},
};

export default ConfirmDialog;
