import {SET_DATA} from './actionTypes';

export const setData = (variable, value) => (
    {
        type: SET_DATA,
        payload: {
            variable: variable,
            value: value
        }
    }
);