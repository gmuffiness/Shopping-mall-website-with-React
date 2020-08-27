import React, { useState } from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props){

    let [clobtn, setClobtn] = useState(true);

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
                                    {/* 체크박스 체크가 되어있는 상품들의 각 가격 x 수량의 총합  */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <p>최종 결제 금액: {props.state_clicked}</p>
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