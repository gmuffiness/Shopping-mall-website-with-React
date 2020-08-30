import React from "react";
import { useHistory } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { connect } from "react-redux";

function Products(props) {

  let history = useHistory();

  function button_state(product, a, i){ // 여기서 product는 원래 데이터, a는 cart에 담긴 data
    
    if( a.find((data)=>{return product.id === data.id}) === undefined ){
      return <button className="btn btn-danger" onClick={()=>{

        if( a["availableCoupon"] === undefined ){
            props.dispatch({type : 'product_add', payload : {id:product.id, name : product.title, quan : 1, price : product.price, coupon : true, incart : true } });

        } else{
            props.dispatch({type : 'product_add', payload : {id:product.id, name : product.title, quan : 1, price : product.price, coupon : false, incart : true } });
        }

        history.push('/cart');

        }}>담기</button>
    } else{
      return <button className="btn btn-danger" onClick={()=>{

        if( a["availableCoupon"] === undefined ){
          props.dispatch({ type : 'quan_minus', payload : {id : product.id, i:i, price : product.price, coupon : true } });

        } else{
          props.dispatch({ type : 'quan_minus', payload : {id : product.id, i:i, price : product.price, coupon : false } });
        }

        history.push('/cart');

        }}>빼기</button>
    }
  }


  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1 className = "head">인기 클래스만 모아 역대급 클래스로!</h1>
          <p className = "head_p">단 5일 동안만 공개 지금 바로 확인해보세요!</p>
        </Container>
    </Jumbotron>
      {
        props.product.map((a,i) => (

          <div className="container">
            <div className="col" onClick={()=>{ history.push('/detail/' + a.id) }}>
              <img src={ a.coverImage} width="50%" height="35%" alt=""/>
              <h4>{ a.title}</h4> 
              <p>{ a.price}원</p>
            </div>
            {button_state(a, props.state, i)}
          </div>
          
        ))
      }
    </div>
  );
}

function state_to_props(state){
  return {
      state : state.reducer,
  }
}

export default connect(state_to_props)(Products)