import { combineReducers } from "redux";
import { routerReducer } from './router/reducers';
import { vkuiReducer } from './vk/reducers';
import { dataReducer } from "./data/reducers";

import { IDataReducer } from "./data/reducers";
import { IRouterReducer } from "./router/reducers";
import { IVKUIReducer } from "./vk/reducers";

export interface IStore {
    vkui: IVKUIReducer,
    router: IRouterReducer,
    data: IDataReducer
}

export default combineReducers({
    vkui: vkuiReducer,
    router: routerReducer,
    data: dataReducer
});