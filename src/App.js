import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from 'react-bootstrap';
import './App.css';
import {productItems} from './productItems.js';
import Detail from './Detail.js';
import Cart from './Cart.js';
import axios from 'axios';

import { Link, Route, useHistory } from 'react-router-dom';

function App() {

  let [product, setProduct] = useState(productItems);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">클래스 shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/detail/">Detail</Nav.Link>
            <Nav.Link as={Link} to="/cart/">Cart</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Route exact path="/products">
        
        <Jumbotron className="jumbo_background">
          <h1>10% Season off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <div className="container">
          <div className="row">
            {
              product.map((a, i)=>{
                return <Card product={product[i]} i={i} key={product.id}/> 
              })
            }
          </div>
        </div>
        {/* <button className="btn btn-primary" onClick={()=>{

          axios.get('')
          .then((result)=>{
            setProduct( [...product, ...result.data]);

          })
          .catch(()=>{})

        }}>더보기</button> */}
      </Route>

      <Route path="/detail/:id">
        <Detail product={product}/>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>

    </div>
  );
}

function Card(props){

  let history = useHistory();
  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.product.id) }}>

      <img src={ props.product.coverImage} width="100%"/>
      <h4>{ props.product.title}</h4>
      <p>{ props.product.price}</p>
    </div>
  )
}


export default App;
