import {createStore} from './createStore';
import combineReducers from './combineReducers';
import compse from './compose';
import compose from './compose';

let state = {
    user: 'abcd',
    model: {
        name: 'string',
        desc: 'desc'
    }
}

let action = {
    type: 'type1',
    payload: {
        action: 'action1'
    }
}

let userReducer = function(state = '',action) {
    if (action.type === 'type1') {
        state = 'changed!';
    }
    
    return state;
};

let modelReducer = function(state =  {name: ''},action) {
    if (action.type === 'type1') {
        state.name = 'changed!';
    }
    
    return state;
};

let reducer = combineReducers({
    user: userReducer,
    model: modelReducer
});

// let store = createStore(reducer,state,undefined);

// console.log(`before: ${store.getState().user}`);

// store.dispatch(action);

// console.log(`after: ${store.getState().user}`);

// console.log('Initialized');