import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { toast, showLoading, hideLoading, request } from '../util'
import _history from '../util/history'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { createAjaxMiddleware } from 'redux-action-extend'

const initialState = {};
const ajaxMiddleware = createAjaxMiddleware({ toast, showLoading, hideLoading, request });
// for redux-tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(
	thunkMiddleware, ajaxMiddleware
))(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);
export const history = syncHistoryWithStore(_history, store);

window.store = store;
export default store;

