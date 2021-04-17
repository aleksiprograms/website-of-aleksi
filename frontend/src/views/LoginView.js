import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Grid, Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context/UserContext';
import useUserApi from '../hooks/useUserApi';

const useStyles = makeStyles((theme) => ({
    field: {
        [theme.breakpoints.up('xs')]: {
            width: '60%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
        },
    },
}));

const LoginView = () => {
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const userApi = useUserApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setUsername('');
        setPassword('');
        setError(userContext.error);
    }, [userContext.error]);

    if (userContext.user != null) {
        return <Redirect to="/admin" />;
    }

    const login = () => {
        setError('');
        userApi.login(username, password);
    };

    return (
        <Box mt={10} mb={2}>
            <Grid container spacing={2}>
                <Grid item container justify="center">
                    <Typography variant="h5">Admin login</Typography>
                </Grid>
                {error && (
                    <Grid item container justify="center">
                        <Typography style={{ color: '#f00' }}>
                            {error}
                        </Typography>
                    </Grid>
                )}
                <Grid item container justify="center">
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                        variant="outlined"
                        autoFocus
                        className={classes.field}
                    />
                </Grid>
                <Grid item container justify="center">
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                        variant="outlined"
                        type="password"
                        className={classes.field}
                    />
                </Grid>
                <Grid item container justify="center">
                    <Button variant="contained" color="primary" onClick={login}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginView;
