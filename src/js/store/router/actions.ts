import { SET_PAGE, SET_STORY, GO_BACK, OPEN_POPOUT, CLOSE_POPOUT, OPEN_MODAL, CLOSE_MODAL, SHOW_SNACKBAR, CLOSE_SNACKBAR } from './actionTypes';

export const closeSnackbar = () => (
    {
        type: CLOSE_SNACKBAR,
    }
);

type SnackbarTypes = "error" | "success" | "warning";
export const showSnackbar = (type: SnackbarTypes, text: string, duration?: number) => (
    {
        type: SHOW_SNACKBAR,
        payload: {
            type: type,
            text: text,
            duration: duration,
        }
    }
);

export const setStory = (story: string, initial_panel: string) => (
    {
        type: SET_STORY,
        payload: {
            story: story,
            initial_panel: initial_panel,
        }
    }
);

export const setPage = (view: string, panel: string) => (
    {
        type: SET_PAGE,
        payload: {
            view: view,
            panel: panel
        }
    }
);

export const goBack = () => (
    {
        type: GO_BACK
    }
);

export const openPopout = (popout: object) => (
    {
        type: OPEN_POPOUT,
        payload: {
            popout: popout
        }
    }
);

export const closePopout = () => (
    {
        type: CLOSE_POPOUT
    }
);

export const openModal = (id: string) => (
    {
        type: OPEN_MODAL,
        payload: {
            id
        }
    }
);

export const closeModal = () => (
    {
        type: CLOSE_MODAL
    }
);
