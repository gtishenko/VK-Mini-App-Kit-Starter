import {SET_DATA} from './actionTypes';

export const setData = (variable: string, value: any) => (
    {
        type: SET_DATA,
        payload: {
            variable: variable,
            value: value
        }
    }
);