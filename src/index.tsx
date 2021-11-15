import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './js/store/reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as VK from './js/services/VK';
import bridge from '@vkontakte/vk-bridge'

import {setStory} from "./js/store/router/actions";

import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';

import App from './App';

bridge.subscribe((e) => {
    if(e.detail.type === 'VKWebAppUpdateConfig') {
        let schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'bright_light';
        document.body.attributes.setNamedItem(schemeAttribute);
        if(e.detail.data.scheme === 'bright_light') {
            bridge.send('VKWebAppSetViewSettings', {
                'status_bar_style': 'dark',
                'action_bar_color': '#fff'
            }).catch(() => {
                // console.log(error);
            })
        }
        else {
            bridge.send('VKWebAppSetViewSettings', {
                'status_bar_style': 'light',
                'action_bar_color': '#191919'
            }).catch(() => {
                // console.log(error);
            })
        }
    }
});

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

VK.initApp()

store.dispatch(setStory('home', 'base'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);