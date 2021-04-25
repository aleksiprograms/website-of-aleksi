import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    CircularProgress,
} from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import useUserApi from '../hooks/useUserApi';
import AppError from '../components/general/AppError';

const LoginView = () => {
    const userContext = useContext(UserContext);
    const userApi = useUserApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (userContext.user != null) {
        return <Redirect to="/admin" />;
    }

    const login = () => {
        setLoading(true);
        setError(null);
        userApi
            .login(username, password)
            .then((response) => {
                userContext.onLogin(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                setUsername('');
                setPassword('');
            });
    };

    return (
        <Box mt={10}>
            <Box mb={2}>
                <Grid container justify="center">
                    <Typography variant="h5">Admin login</Typography>
                </Grid>
            </Box>
            {loading || userContext?.authenticating ? (
                <Grid container justify="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid container direction="column" alignItems="center" xs={12}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        spacing={2}
                        xs={9}
                        sm={7}
                        md={5}
                    >
                        {error && (
                            <Grid item container>
                                <AppError error={error} />
                            </Grid>
                        )}
                        <Grid item container>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                fullWidth
                                variant="outlined"
                                autoFocus
                            />
                        </Grid>
                        <Grid item container>
                            <TextField
                                label="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                fullWidth
                                variant="outlined"
                                type="password"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={login}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default LoginView;
