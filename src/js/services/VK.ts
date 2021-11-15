import bridge from "@vkontakte/vk-bridge";
import { store } from "../..";

import { setColorScheme } from "../store/vk/actions";

export const initApp = () => (dispatch: any) => {
    const VKBridgeCallback = (e: any) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            bridge.unsubscribe(VKBridgeCallback);

            store.dispatch(setColorScheme(e.detail.data.scheme));
        }
    };

    bridge.subscribe(VKBridgeCallback);
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