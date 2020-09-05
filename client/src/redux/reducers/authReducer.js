import {
    LOG_IN,
    LOG_OUT,
    LOG_IN_FAILED
} from '../actionTypes';

const initialState = {
    user: null,
    authOk: true
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            window.localStorage.setItem(
                'adminUser',
                JSON.stringify(action.payload.user)
            );
            return {
                user: action.payload.user,
                authOk: true
            };

        case LOG_OUT:
            window.localStorage.removeItem('adminUser');
            return {
                user: null,
                authOk: true
            };

        case LOG_IN_FAILED:
            return {
                user: null,
                authOk: false
            };

        default:
            return state;
    }
};

export default authReducer;