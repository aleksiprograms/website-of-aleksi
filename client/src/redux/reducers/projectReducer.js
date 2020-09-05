import {
    GET_PROJECTS,
    ADD_PROJECT,
    EDIT_PROJECT,
    REMOVE_PROJECT
} from '../actionTypes';

const projectReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return action.payload.projects;

        case ADD_PROJECT:
            return [...state, action.payload.project];

        case EDIT_PROJECT:
            return state.map(item => {
                if (item.id === action.payload.project.id) {
                    return action.payload.project;
                } else {
                    return item;
                }
            });

        case REMOVE_PROJECT:
            return state.filter(item => item.id !== action.payload.id);

        default:
            return state;
    }
};

export default projectReducer;