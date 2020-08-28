import React from "react";
import { useHistory } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { connect } from "react-redux";

function Products(props) {

  let history = useHistory();

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1 className = "head">인기 클래스만 모아 역대급 클래스로!</h1>
          <p className = "head_p">
            단 5일 동안만 공개
            지금 바로 확인해보세요!
          </p>
        </Container>
    </Jumbotron>
      {
        props.product.map((a,i) => (

          <div className="container">
            <div className="col" onClick={()=>{ history.push('/detail/' + a.id) }}>
              <img src={ a.coverImage} width="50%" height="35%"/>
              <h4>{ a.title}</h4> 
              <p>{ a.price}원</p>
            </div>
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