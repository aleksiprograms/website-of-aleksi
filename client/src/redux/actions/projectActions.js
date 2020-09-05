import axios from 'axios';
import {
    GET_PROJECTS,
    ADD_PROJECT,
    EDIT_PROJECT,
    REMOVE_PROJECT
} from '../actionTypes';
import { tokenConfig } from './authActions';

export const getProjects = () => {
    return async dispatch => {
        const response = await axios.get('/api/projects');
        dispatch({
            type: GET_PROJECTS,
            payload: {
                projects: response.data
            }
        });
    };
}

export const addProject = (project) => {
    return async (dispatch, getState) => {
        const response = await axios.post(
            '/api/projects', project, tokenConfig(getState)
        );
        project.id = response.data.id;
        dispatch({
            type: ADD_PROJECT,
            payload: {
                project: project
            }
        });
    };
}

export const editProject = (project) => {
    return async (dispatch, getState) => {
        axios.put(
            `${'/api/projects'}/${project.id}`, project, tokenConfig(getState)
        );
        dispatch({
            type: EDIT_PROJECT,
            payload: {
                project: project
            }
        });
    };
}

export const removeProject = (id) => {
    return async (dispatch, getState) => {
        await axios.delete(
            `${'/api/projects'}/${id}`, tokenConfig(getState)
        );
        dispatch({
            type: REMOVE_PROJECT,
            payload: {
                id: id
            }
        });
    };
}