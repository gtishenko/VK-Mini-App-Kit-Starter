import {
    SET_COLOR_SCHEME,
    SET_SCROLL_POSITION_BY_ID
} from './actionTypes';

type SchemesList = "bright_light" | "space_gray" | "vkcom_light" | "vkcom_dark";
export interface IVKUIReducer {
    colorScheme: SchemesList,

    activeTab: string[],
    componentScroll: string[]
}

const initialState: IVKUIReducer = {
    colorScheme: "bright_light",

    activeTab: [],
    componentScroll: []
};

interface IAction {
    readonly type: string,
    readonly payload: string,
}

export const vkuiReducer = (state = initialState, action: IAction) => {

    switch (action.type) {

        case SET_COLOR_SCHEME: {
            return {
                ...state,
                colorScheme: action.payload,
            };
        }

        case SET_SCROLL_POSITION_BY_ID: {

            if(document.getElementById(action.payload)) {
                interface IHTMLElement {
                    readonly scrollLeft?: number,
                    readonly scrollTop?: number,
                }
                
                let element: IHTMLElement = document.getElementById(action.payload)!.getElementsByClassName("HorizontalScroll__in")[0];
    
                let x = element.scrollLeft;
                let y = element.scrollTop;
    
                return {
                    ...state,
                    componentScroll: {
                        ...state.componentScroll,
                        [action.payload]: {
                            x: x,
                            y: y
                        }
                    },
                };
            } else {
                console.error("Element is null");
                return state;
            }
        }

        default: {
            return state;
        }
    }
};