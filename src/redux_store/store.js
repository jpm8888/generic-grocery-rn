import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './reducers';
import rootEpic from './epics';


const epicMiddleware = createEpicMiddleware();

const initial_state = {

};

const store = createStore(rootReducer, initial_state, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic)

export default store;
