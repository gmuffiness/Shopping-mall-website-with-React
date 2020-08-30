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
    let copy = [...state];

    if ( found >= 0  ){
      
      copy[found].quan++;
      return copy  

    } else {
    
      if (state.length > 2){
        alert("장바구니에는 최대 3개의 상품이 담길 수 있습니다.");
        return state

      } else{
     
        console.log("incart_check", copy)
        copy.push(action.payload);
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
      copy[found].incart = false;
      console.log("incart_check2", copy[found].incart)
      copy.splice(found,1);
      return copy
    }
  
  } else{
    return state
  }
}

let flag = false;
let init_sum = [0,0];

function reducer2(state = init_sum, action){

  let copy = [...state];
  if ( action.type === "checked" ){

    if (action.payload.checked){
      flag = true;
      console.log("checked")
      if (action.payload.coupon){
        copy[0] = copy[0] + action.payload.price * action.payload.quan;
        // console.log(copy)
        return copy
      } else{
        copy[1] = copy[1] + action.payload.price * action.payload.quan;
        // console.log(copy)
        return copy
      }
      
    } else{
      flag = false;
      console.log("NOT checked")
      if (action.payload.coupon){
        copy[0] = copy[0] - action.payload.price * action.payload.quan;
        return copy

      } else{
        copy[1] = copy[1] - action.payload.price * action.payload.quan;
        return copy
      }
    }

  } else if( action.type === 'quan_plus' ){
    // console.log(flag)
    if (flag){
      console.log("flag4");
      copy[0] += action.payload.price;
      return copy

    } else {
      return copy
    }

  } else if( action.type === 'quan_minus' ){
    
    // console.log(flag)
    if (flag){
      console.log("flag4");
      copy[0] -= action.payload.price;
      return copy

    } else {
      return copy
    }

  } else{
    console.log("flag5")
    let state = [0,0];
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
