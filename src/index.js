import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';

let init_val = [
  // {id : 0, name : "멋진신발", quan : 2},
  // {id : 1, name : "멋진신발2", quan : 4},
]

function reducer(state = init_val, action){
  if ( action.type === 'product_add'){
    
    let found = state.findIndex((a)=>{ return a.id === action.payload.id });
    console.log(found)
    if ( found >= 0  ){
      let copy = [...state];
      copy[found].quan++;
      return copy
    
    } else {
      let copy = [...state];
      copy.push(action.payload);
      return copy
    }

  } else if ( action.type === 'quan_plus'){

    let copy = [...state];
    copy[action.payload.i].quan++; // 여기서 payload 는 a.id => B9vUv0E0ibc0X55kVVLr 이런 문자열일 것.
    return copy

  } else if ( action.type === 'quan_minus'){

    let copy = [...state];
    copy[action.payload.i].quan--;
    return copy

  } else{
    return state 
  }
}

let init_alert = true;

function reducer2(state = init_alert, action){
  if ( action.type === 'clo_btn'){

    // let copy = [...state];
    state = false;
    return state

  } else{
  return state
  }
}

let store = createStore(combineReducers({reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
