import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

import { CSSTransition } from 'react-transition-group';

function Detail(props) {
    
    let [alert, setAlert] = useState(true); 
    let [input, setInput] = useState('');

    let [pressedtab, setPreesedtab] = useState(0);
    let [switchtab, setSwitchtab] = useState(true);


    useEffect(()=>{
        let timer = setTimeout(() => {
            setAlert(false)
        },2000);
        return ()=>{ clearTimeout(timer) }
    },[alert]);

    let { id } = useParams();
    let history = useHistory();
    let target_item = props.product.find(x => x.id == id);

    return (
        <div className="container">
            
            <div className="row">
                <div className="col-md-6">
                    <img src="https://cdn.class101.net/images/1ea53728-c3f7-4fe9-a485-88c9a130b3b4" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{target_item.title}</h4>
                    <p>{target_item.price}원</p>
                    <p>{target_item.score}점</p>

                    <button className="btn btn-danger" onClick={()=>{

                    }}>주문하기</button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={()=>{
                        history.goBack(); // history.push('/')
                    }}>뒤로가기</button> 
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{ setSwitchtab(false); setPreesedtab(0) }}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{ setPreesedtab(1) }}>Option 2</Nav.Link>
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

export default Detail;