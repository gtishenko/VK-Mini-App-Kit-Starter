import {SET_DATA} from './actionTypes';

export interface IDataReducer {
}

const initialState: IDataReducer = {
};

interface IAction {
    readonly type: string,
    readonly payload: {
        variable: string,
        value: any
    }
}

export const dataReducer = (state = initialState, action: IAction) => {

    switch (action.type) {
        
        case SET_DATA: {
            return {
                ...state,
                [action.payload.variable]: action.payload.value
            };
        }

        default: {
            return state;
        }

    }

};