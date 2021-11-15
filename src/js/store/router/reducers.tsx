import React from 'react';

import {
    SET_PAGE,
    GO_BACK,
    OPEN_POPOUT,
    CLOSE_POPOUT,
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_STORY,
    SHOW_SNACKBAR,
    CLOSE_SNACKBAR
} from './actionTypes';

import * as VK from "../../services/VK";
import { smoothScrollToTop } from "../../services/functions";
import { Icon16ErrorCircleFill, Icon20CheckCircleFillGreen, Icon24WarningTriangleOutline } from '@vkontakte/icons';
import { Snackbar } from '@vkontakte/vkui';
import { closeSnackbar } from './actions';
import { store } from '../../../index';

export interface IRouterReducer {
    activeStory: string | null,
    activeView: string | null,
    activePanel: string | null,
    activeSnackbar: JSX.Element | null,

    storiesHistory: string[],
    viewsHistory: {
        [key: string]: string[]
    },
    panelsHistory: {
        [key: string]: string[]
    },

    activeModals: {
        [key: string]: string //[]
    },
    modalHistory: {
        [key: string]: string[]
    },
    popouts: {
        [key: string]: string[] | null
    },

    scrollPosition: {
        [key: string]: number
    }
}

const initialState: IRouterReducer = {
    activeStory: null,
    activeView: null,
    activePanel: null,
    activeSnackbar: null,

    storiesHistory: [],
    viewsHistory: {},
    panelsHistory: {},

    activeModals: {},
    modalHistory: {},
    popouts: {},

    scrollPosition: {}
};

interface IAction {
    readonly type: string,
    readonly payload?: any,
}

export const routerReducer = (state = initialState, action: IAction) => {

    switch (action.type) {

        case CLOSE_SNACKBAR: {
            console.log("+");
            
            if(!state.activeView) return state;
            if(!state.activeSnackbar) return state;

            return {
                ...state,
                activeSnackbar: null
            };
        }

        case SHOW_SNACKBAR: {
            if(!state.activeView) return state;
            if(state.activeSnackbar) return state;

            let icon: React.ReactNode;
            if (action.payload.type === "error") icon = <Icon16ErrorCircleFill width={24} height={24} />;
            else if (action.payload.type === "success") icon = <Icon20CheckCircleFillGreen width={24} height={24} />;
            else if (action.payload.type === "warning") icon = <Icon24WarningTriangleOutline />;
            
            const snackbar: JSX.Element = (<Snackbar
                layout="vertical"
                onClose={() => store.dispatch(closeSnackbar())}
                before={icon}
                duration={action.payload.duration}
            >
                {action.payload.text}
            </Snackbar>);

            console.log(snackbar);
            

            return {
                ...state,
                activeSnackbar: snackbar
            };
        }

        case SET_PAGE: {
            if(!state.activeStory || !state.activeView) return state;
            let View: string = action.payload.view;
            let Panel: string = action.payload.panel;

            window.history.pushState(null, null!);

            let panelsHistory: string[] = state.panelsHistory[View] || [];
            let viewsHistory: string[] = state.viewsHistory[state.activeStory] || [];

            const viewIndexInHistory: number = viewsHistory.indexOf(View);

            if (viewIndexInHistory !== -1) {
                viewsHistory.splice(viewIndexInHistory, 1);
            }

            if (panelsHistory.indexOf(Panel) === -1) {
                panelsHistory = [...panelsHistory, Panel];
            }

            if (panelsHistory.length > 1) {
                VK.swipeBackOn();
            }

            return {
                ...state,
                activeView: View,
                activePanel: Panel,

                panelsHistory: {
                    ...state.panelsHistory,
                    [View]: panelsHistory,
                },
                viewsHistory: {
                    ...state.viewsHistory,
                    [state.activeStory!]: [...viewsHistory, View]
                },
                scrollPosition: {
                    ...state.scrollPosition,
                    [state.activeStory + "_" + state.activeView + "_" + state.activePanel]: window.pageYOffset
                }
            };
        }

        case SET_STORY: {
            window.history.pushState(null, null!);

            let viewsHistory = state.viewsHistory[action.payload.story] || [action.payload.story];

            let storiesHistory = state.storiesHistory;
            let activeView = viewsHistory[viewsHistory.length - 1];
            let panelsHistory = state.panelsHistory[activeView] || [action.payload.initial_panel];
            let activePanel = panelsHistory[panelsHistory.length - 1];
            
            if (action.payload.story === state.activeStory) {
                if (panelsHistory.length > 1 ) {
                    let firstPanel: string | undefined = panelsHistory.shift();
                    if(!firstPanel) return state;
                    panelsHistory = [firstPanel];

                    activePanel = panelsHistory[panelsHistory.length - 1];
                } else if (viewsHistory.length > 1) {
                    let firstView: string | undefined = viewsHistory.shift();
                    if(!firstView) return state;
                    viewsHistory = [firstView];

                    activeView = viewsHistory[viewsHistory.length - 1];
                    panelsHistory = state.panelsHistory[activeView];
                    activePanel = panelsHistory[panelsHistory.length - 1];
                }
            }

            if (action.payload.story === state.activeStory && panelsHistory.length === 1 && window.pageYOffset > 0) {
                window.scrollTo(0, 30);

                smoothScrollToTop();
            }

            const storiesIndexInHistory = storiesHistory.indexOf(action.payload.story);

            if (storiesIndexInHistory === -1 || (storiesHistory[0] === action.payload.story && storiesHistory[storiesHistory.length - 1] !== action.payload.story)) {
                storiesHistory = [...storiesHistory, action.payload.story];
            }

            return {
                ...state,
                activeStory: action.payload.story,
                activeView: activeView,
                activePanel: activePanel,

                storiesHistory: storiesHistory,
                viewsHistory: {
                    ...state.viewsHistory,
                    [activeView]: viewsHistory
                },
                panelsHistory: {
                    ...state.panelsHistory,
                    [activeView]: panelsHistory
                },

                scrollPosition: {
                    ...state.scrollPosition,
                    [state.activeStory + "_" + state.activeView + "_" + state.activePanel]: window.pageYOffset
                }
            };
        }

        case GO_BACK: {
            if(!state.activeView || !state.activePanel || !state.activeStory) return state;
            let setView: string = state.activeView;
            let setPanel: string = state.activePanel;
            let setStory: string = state.activeStory;

            let popoutsData = state.popouts;

            if (popoutsData[setView]) {
                popoutsData[setView] = null;

                return {
                    ...state,
                    popouts: {
                        ...state.popouts, popoutsData
                    }
                };
            }

            let viewModalsHistory = state.modalHistory[setView];

            if (viewModalsHistory !== undefined && viewModalsHistory.length !== 0) {
                let activeModal = viewModalsHistory[viewModalsHistory.length - 2] || null;

                if (activeModal === null) {
                    viewModalsHistory = [];
                } else if (viewModalsHistory.indexOf(activeModal) !== -1) {
                    viewModalsHistory = viewModalsHistory.splice(0, viewModalsHistory.indexOf(activeModal) + 1);
                } else {
                    viewModalsHistory.push(activeModal);
                }

                return {
                    ...state,
                    activeModals: {
                        ...state.activeModals,
                        [setView]: activeModal
                    },
                    modalHistory: {
                        ...state.modalHistory,
                        [setView]: viewModalsHistory
                    }
                };
            }

            let panelsHistory = state.panelsHistory[setView] || [];
            let viewsHistory = state.viewsHistory[state.activeStory] || [];
            let storiesHistory = state.storiesHistory;

            if (panelsHistory.length > 1) {
                panelsHistory.pop();

                setPanel = panelsHistory[panelsHistory.length - 1];
            } else if (viewsHistory.length > 1) {
                viewsHistory.pop();

                setView = viewsHistory[viewsHistory.length - 1];
                let panelsHistoryNew = state.panelsHistory[setView];

                setPanel = panelsHistoryNew[panelsHistoryNew.length - 1];
            } else if (storiesHistory.length > 1) {
                storiesHistory.pop();

                setStory = storiesHistory[storiesHistory.length - 1];
                setView = state.viewsHistory[setStory][state.viewsHistory[setStory].length - 1];

                let panelsHistoryNew = state.panelsHistory[setView];

                if (panelsHistoryNew.length > 1) {
                    setPanel = panelsHistoryNew[panelsHistoryNew.length - 1];
                } else {
                    setPanel = panelsHistoryNew[0];
                }
            } else {
                VK.closeApp();
            }

            if (panelsHistory.length === 1) {
                VK.swipeBackOff();
            }

            return {
                ...state,
                activeView: setView,
                activePanel: setPanel,
                activeStory: setStory,

                viewsHistory: {
                    ...state.viewsHistory,
                    [state.activeView]: viewsHistory
                },
                panelsHistory: {
                    ...state.panelsHistory,
                    [state.activeView]: panelsHistory
                }
            };
        }

        case OPEN_POPOUT: {
            if(!state.activeView) return state;
            document.body.style.overflow = "hidden";
            window.history.pushState(null, null!);

            return {
                ...state,
                popouts: {
                    ...state.popouts,
                    [state.activeView]: action.payload.popout
                }
            };
        }

        case CLOSE_POPOUT: {
            if(!state.activeView) return state;
            document.body.style.overflow = "auto";
            
            return {
                ...state,
                popouts: {
                    ...state.popouts,
                    [state.activeView]: null
                }
            };
        }

        case OPEN_MODAL: {
            if(!state.activeView) return state;
            window.history.pushState(null, null!);

            let activeModal: string | null = action.payload.id || null;
            let modalsHistory: string[] = state.modalHistory[state.activeView] ? [...state.modalHistory[state.activeView]] : [];

            if (activeModal === null) {
                modalsHistory = [];
            } else if (modalsHistory.indexOf(activeModal) !== -1) {
                modalsHistory = modalsHistory.splice(0, modalsHistory.indexOf(activeModal) + 1);
            } else {
                modalsHistory.push(activeModal);
            }

            return {
                ...state,
                activeModals: {
                    ...state.activeModals,
                    [state.activeView]: activeModal
                },
                modalHistory: {
                    ...state.modalHistory,
                    [state.activeView]: modalsHistory
                }
            };
        }

        case CLOSE_MODAL: {
            if(!state.activeView) return state;
            let activeModal = state.modalHistory[state.activeView][state.modalHistory[state.activeView].length - 2] || null;
            let modalsHistory = state.modalHistory[state.activeView] ? [...state.modalHistory[state.activeView]] : [];

            if (activeModal === null) {
                modalsHistory = [];
            } else if (modalsHistory.indexOf(activeModal) !== -1) {
                modalsHistory = modalsHistory.splice(0, modalsHistory.indexOf(activeModal) + 1);
            } else {
                modalsHistory.push(activeModal);
            }
            
            return {
                ...state,
                activeModals: {
                    ...state.activeModals,
                    [state.activeView]: activeModal
                },
                modalHistory: {
                    ...state.modalHistory,
                    [state.activeView]: modalsHistory
                }
            };
        }

        default: {
            return state;
        }
    }
};
