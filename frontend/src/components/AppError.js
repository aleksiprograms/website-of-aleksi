import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.getContrastText(theme.palette.error.main),
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1),
    },
}));

const AppError = (props) => {
    const { error } = props;

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Typography>{error?.response?.data?.message}</Typography>
        </Grid>
    );
};

AppError.defaultProps = {
    error: {
        response: {
            data: {
                message: 'Error message',
            },
        },
    },
};

export default AppError;
