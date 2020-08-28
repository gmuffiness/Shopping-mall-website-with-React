import React, { useState } from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import { coupons } from '../coupons.js';

function Cart(props){

    let [clobtn, setClobtn] = useState(true);
    let [coupon, setCoupon] = useState(coupons);
    let [couponbtn,setCouponbtn] = useState("none");
    let final = 0;

    function handleChange(e) {
        if (e.target.value === "none"){
            setCouponbtn("none")
        } else if(e.target.value === "discountRate"){
            setCouponbtn("discountRate")
        } else{
            setCouponbtn("discountAmount")
        }
      }

    function final_price(couponbtn, total_price){

        if (couponbtn === "none"){
            final = total_price
            return final 

        } else if (couponbtn === "discountRate"){
            final = total_price * 0.9
            return final 

        } else{
            final = total_price - 10000
            return final
        }
    }

    // function final_price2(couponbtn, total_price){
    //     // console.log("hihihis")
    //     if (couponbtn === "none"){
    //         final = total_price[0] + total_price[1]
    //         return final // + total_price[1]

    //     } else if (couponbtn === "discountRate"){
    //         final = total_price[0] * 0.9 + total_price[1]
    //         return final //* 0.9 + total_price[1]

    //     } else{
    //         final = total_price[0] + total_price[1] - 10000
    //         return final //+ total_price[1]
    //     }
    // }

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
                                        <button onClick={()=>{ props.dispatch({ type : 'quan_plus', payload : {id : a.id, i : i, price : a.price } }) }}>+</button>
                                        <button onClick={()=>{ props.dispatch({ type : 'quan_minus', payload : {id : a.id, i : i, price : a.price } }) }}>-</button>
                                    </td>
                                    <td>
                                        <input type="checkbox" onChange={(e)=>{
                                            let checked = e.target.checked;
                                            props.dispatch({ type: 'checked', payload : {id : a.id, i : i, price : a.price, quan : a.quan, coupon : a.coupon, checked : checked }})
            
                                         }}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
            <select onChange={(e)=>{ handleChange(e) }}>
                <option value="none">--쿠폰--</option>
                <option value="discountRate">{coupon[0].title}</option>
                <option value="discountAmount">{coupon[1].title}</option>
                
            </select>
                    { console.log(couponbtn, props.state_clicked)}
                    { console.log("yeah this is it")}
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
        state_clicked : state.reducer2,
    }
}

export default connect(state_to_props)(Cart)