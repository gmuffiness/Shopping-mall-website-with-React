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
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((a,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{ i }</td>
                                    <td>{ a.name }</td>
                                    <td>{ a.quan }</td>
                                    <td>
                                        <button onClick={()=>{ props.dispatch({ type : 'quan_plus', payload : {id : a.id, i : i} }) }}>+</button>
                                        <button onClick={()=>{ props.dispatch({ type : 'quan_minus', payload : {id : a.id, i : i} }) }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
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
        // state_alert : state.reducer2,
    }
}

export default connect(state_to_props)(Cart)

// export default Cart;