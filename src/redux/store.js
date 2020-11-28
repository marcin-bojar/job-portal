import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import createReduxPromiseListener from 'redux-promise-listener';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const reduxPromiseListener = createReduxPromiseListener();
console.log(reduxPromiseListener);

const middlewares = [sagaMiddleware, reduxPromiseListener.middleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const promiseListener = reduxPromiseListener;

sagaMiddleware.run(rootSaga);
