import {combineReducers} from "redux";
import {routerReducer} from './router/reducers';
import {vkuiReducer} from './vk/reducers';
import {dataReducer} from "./data/reducers";

export default combineReducers({
    vkui: vkuiReducer,
    router: routerReducer,
    data: dataReducer
});