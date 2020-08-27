import React, { useState } from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import { coupons } from './coupons.js';

function Cart(props){

    let [clobtn, setClobtn] = useState(true);
    let [coupon, setCoupon] = useState(coupons);
    let [couponbtn,setCouponbtn] = useState("none");
    let [fin_price, setFin_price] = useState(0);

    function handleChange(e, total) {
        if (e.target.value == "none"){
            setCouponbtn("none")
        } else if(e.target.value == "discountRate"){
            setCouponbtn("discountRate")
        } else{
            setCouponbtn("discountAmount")
        }
      }

    function final_price(couponbtn, total){
        if (couponbtn === "none"){
            return total
        } else if (couponbtn === "discountRate"){
            return total * 0.9
        } else{
            return total - 10000
        }
    }
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>변경</th>
                        <th>결제할 상품</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((a,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{ i }</td>
                                    <td>{ a.name }</td>
                                    <td>{ a.price }</td>
                                    <td>{ a.quan }</td>
                                    <td>
                                        <button onClick={()=>{ props.dispatch({ type : 'quan_plus', payload : {id : a.id, i : i} }) }}>+</button>
                                        <button onClick={()=>{ props.dispatch({ type : 'quan_minus', payload : {id : a.id, i : i} }) }}>-</button>
                                    </td>
                                    <td>
                                        <input type="checkbox" onChange={(e)=>{
                                            let checked = e.target.checked;
                                            props.dispatch({ type: 'checked', payload : {id : a.id, i : i, price : a.price, quan : a.quan, checked : checked }})
                                         }}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
            <select onChange={(e)=>{ handleChange(e, props.state_clicked) }}>
                <option value="none">--쿠폰--</option>
                <option value="discountRate">{coupon[0].title}</option>
                <option value="discountAmount">{coupon[1].title}</option>
                
            </select>

            <p>최종 결제 금액: { final_price( couponbtn, props.state_clicked ) }</p>

            <button onClick= {()=>{}}> 결제하기</button>
            { clobtn === true
                ? ( <div className="my-alert2">
                        <p>지금 구매하시면 20% 할인됩니다!</p>
                        <button onClick={()=>{ setClobtn(false) }}>닫기</button>
                    </div> )
                : null
            }
        </div>
    )
}

function state_to_props(state){
    return {
        state : state.reducer,
        state_clicked : state.reducer3,
        // state_alert : state.reducer2,
    }
}

export default connect(state_to_props)(Cart)

// export default Cart;