import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';


let init_val = [
  // {id : 0, name : "test", quan : 2},
  // {id : 1, name : "test2", quan : 4},
];

function reducer(state = init_val, action){

  if ( action.type === 'product_add'){
    
    let found = state.findIndex((a)=>{ return a.id === action.payload.id }); // init_val에 있는 id값과 눌렀을때 받은 id값이 일치하는 index
    // console.log(state)
    if ( found >= 0  ){
      let copy = [...state];
      copy[found].quan++;
      copy[found].flag = true;
      return copy  
    } else {
      
      if (state.length > 2){
        alert("장바구니에는 최대 3개의 상품이 담길 수 있습니다.");
        return state
      } else{
        let copy = [...state];
        copy.push(action.payload);
        // copy[found].flag = true;
        return copy
      }
      
    }

  } else if ( action.type === 'quan_plus'){
    
    let copy = [...state];
    copy[action.payload.i].quan++; // 여기서 payload 는 a.id => B9vUv0E0ibc0X55kVVLr 이런 문자열일 것.
    return copy

  } else if ( action.type === 'quan_minus'){

    let copy = [...state];
    let found = state.findIndex((a)=>{ return a.id === action.payload.id });

    if (copy[action.payload.i].quan > 1 ){
      copy[action.payload.i].quan--;
      return copy
    } else{
      copy.splice(found,1);
      return copy
    }
  
  } else{
    return state 
  }
}

let init_btn = false;

function reducer2(state = init_btn, action){
  if( 1 > 3 ){
    console.log(init_val)
    state = true;
    return state
  } else{
    return state
  }
}


let init_sum = 0;

function reducer3(state = init_sum, action){
  if ( action.type === "checked" ){

    if (action.payload.checked){
      state = state + action.payload.price * action.payload.quan;
      return state
    
    } else{
      state = state - action.payload.price * action.payload.quan;
      return state
    }

  } else{
    return state
  }
}

let store = createStore(combineReducers({reducer, reducer2, reducer3}));

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
