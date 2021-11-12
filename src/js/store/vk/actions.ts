import {
    SET_COLOR_SCHEME,
    SET_SCROLL_POSITION_BY_ID
} from './actionTypes';

type SchemesList = "bright_light" | "space_gray" | "vkcom_light" | "vkcom_dark";
export const setColorScheme = (scheme: SchemesList) => (
    {
        type: SET_COLOR_SCHEME,
        payload: scheme
    }
);

export const setScrollPositionByID = (component: string) => (
    {
        type: SET_SCROLL_POSITION_BY_ID,
        payload: component
    }
);