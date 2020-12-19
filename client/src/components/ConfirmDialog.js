import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
} from '@material-ui/core';

const ConfirmDialog = ({ open, onCancel, onConfirm, text }) => {

    return (
        <Dialog
            open={open}
            onClose={onCancel}
        >
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
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
}

export default ConfirmDialog;