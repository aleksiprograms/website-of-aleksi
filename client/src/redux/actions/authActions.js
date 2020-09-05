import axios from 'axios';
import {
    LOG_IN,
    LOG_OUT,
    LOG_IN_FAILED
} from '../actionTypes';

export const logIn = (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(
                '/api/login',
                { username: username, password: password }
            );
            dispatch({
                type: LOG_IN,
                payload: {
                    user: response.data
                }
            });
        } catch {
            dispatch({
                type: LOG_IN_FAILED,
                payload: {
                    user: null
                }
            });
        }
    };
}

export const setUser = (user) => {
    return dispatch => {
        dispatch({
            type: LOG_IN,
            payload: {
                user: user
            }
        });
    };
}

export const logOut = () => {
    return dispatch => {
        dispatch({
            type: LOG_OUT,
            payload: {}
        });
    };
}

export const tokenConfig = getState => {
    let token = getState().auth.user.token;
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    return config;
};