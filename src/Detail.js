import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

import { CSSTransition } from 'react-transition-group';

function Detail(props) {
    
    // let [alert, setAlert] = useState(true); 
    let [pressedtab, setPreesedtab] = useState(0);
    let [switchtab, setSwitchtab] = useState(true);


    // useEffect(()=>{
    //     let timer = setTimeout(() => {
    //         setAlert(false)
    //     },2000);
    //     return ()=>{ clearTimeout(timer) }
    // },[alert]);

    let { id } = useParams();
    let history = useHistory();
    let target_item = props.product.find(x => x.id === id);

    function coupon_available(){
        if( target_item["availableCoupon"] === undefined ){
            console.log("hihi")
        }
    }

    return (
        <div className="container">
            
            <div className="row">
                <div className="col-md-6">
                    <img src={ target_item.coverImage } width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{target_item.title}</h4>
                    <p>{target_item.price}원</p>
                    <p>{target_item.score}점</p>

                    <button className="btn btn-danger" onClick={()=>{


                        if( target_item["availableCoupon"] === undefined ){
                            props.dispatch({type : 'product_add', payload : {id:target_item.id, name : target_item.title, quan : 1, price : target_item.price, coupon : true } });
                        
                        } else{
                            props.dispatch({type : 'product_add', payload : {id:target_item.id, name : target_item.title, quan : 1, price : target_item.price, coupon : false } });
                        }

                        history.push('/cart');

                    }}>장바구니</button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={()=>{
                        history.goBack(); // history.push('/')
                    }}>뒤로가기</button> 
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{ setSwitchtab(false); setPreesedtab(0) }}>상품설명</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{ setPreesedtab(1) }}>배송정보</Nav.Link>
                </Nav.Item>
            </Nav>
                
            <CSSTransition in={switchtab} classNames="opacity" timeout={500}>
                <TabContent pressedtab={pressedtab} setSwitchtab={setSwitchtab}/>
            </CSSTransition>

        </div> 
    )
}

function TabContent(props){

    useEffect(()=>{
        props.setSwitchtab(true);
    })

    if (props.pressedtab === 0) {
        return <div>0번째 내용</div>
    } else if (props.pressedtab === 1) {
        return <div>1번째 내용</div>
    } else if (props.pressedtab === 2) {
        return <div>2번째 내용</div>
    }

}

function state_to_props(state){
    return {
        state : state.reducer,
        // title : state[0].name
    }
}

export default connect(state_to_props)(Detail)

// export default Detail;