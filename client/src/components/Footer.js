import React from 'react';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#111",
        color: "#fff",
    },
    text: {
        paddingTop: 10,
        paddingBottom: 10,
    },
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="md">
                <Grid container justify="center">
                    <Typography
                        variant="caption"
                        align="center"
                        color="inherit"
                        className={classes.text}
                    >
                        Copyright &copy; 2020{new Date().getFullYear() != 2020 ? " - " + new Date().getFullYear() : ""} Aleksi Tolvanen, All Rights Reserved
                    </Typography>
                </Grid>
            </Container>
        </div>
    );
}

export default Footer;