import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        borderRadius: theme.spacing(1),
        [theme.breakpoints.up('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '85%',
        },
        [theme.breakpoints.up('md')]: {
            width: '70%',
        },
    },
}));

const HomeView = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Grid container spacing={2}>
            <Grid item container justify="center">
                <Typography variant="h4">Hey, I’m Aleksi</Typography>
            </Grid>
            <Grid item container justify="center">
                <Typography variant="h6" align="center">
                    I’m mainly self-taught programmer/developer and I’m
                    interested in game, mobile and web development.
                </Typography>
            </Grid>
            <Grid item container justify="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push('/projects')}
                >
                    Projects
                </Button>
            </Grid>
            <Grid item container justify="center">
                <img
                    src="https://dl.dropboxusercontent.com/s/q2mf0ugw4ohzrlm/battleagainstshapesart.png?dl=0"
                    alt="Home page art"
                    className={classes.image}
                />
            </Grid>
        </Grid>
    );
};

export default HomeView;
