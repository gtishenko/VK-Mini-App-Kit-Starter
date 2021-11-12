import bridge from "@vkontakte/vk-bridge";

import { setColorScheme } from "../store/vk/actions";

export const initApp = () => (dispatch: any) => {
    const VKConnectCallback = (e: any) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            bridge.unsubscribe(VKConnectCallback);

            dispatch(setColorScheme(e.detail.data.scheme));
        }
    };

    bridge.subscribe(VKConnectCallback);
    return bridge.send('VKWebAppInit', {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const closeApp = () => {
    return bridge.send("VKWebAppClose", {
        "status": "success"
    }).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOn = () => {
    return bridge.send("VKWebAppEnableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};

export const swipeBackOff = () => {
    return bridge.send("VKWebAppDisableSwipeBack", {}).then(data => {
        return data;
    }).catch(error => {
        return error;
    });
};