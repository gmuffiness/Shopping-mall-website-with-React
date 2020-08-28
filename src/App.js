import React, { useState } from 'react';
import { Navbar, Nav, Button, Jumbotron} from 'react-bootstrap';
import './App.css';
import {productItems} from './productItems.js';
import Detail from './components/Detail.js';
import Cart from './components/Cart.js';
import Products from './components/Products.js';
import Pagination from './components/Pagination.js';

import { Link, Route, useHistory } from 'react-router-dom';

function App() {

  let [product, setProduct] = useState(productItems);

	const [currentPage, setCurrentPage] = useState(1); 
  const [productsPerPage] = useState(5); 
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function desc_sort(product){
    
    const result = product.sort((a, b) => b.score > a.score ? 1 : -1)
    return result
  
  }

  return (
    <div className="App">
      {console.log(desc_sort(product)[0].score)}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">CLASS101</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart/">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Route exact path="/">
        
        <Jumbotron className="jumbo_background">
          <h1 className="head">인기 클래스만 모아 역대급 클래스로!</h1>
          <p className="head_p">
            단 5일 동안만 공개
            지금 바로 확인해보세요!
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

      </Route>

      <Route exact path="/products">

        <Products product={currentProducts} />
        <Pagination productsPerPage={productsPerPage} totalProducts={product.length} paginate={paginate} />
      </Route>


      <Route path="/detail/:id">
        <Detail product={product}/>
      </Route>

      <Route path="/cart">
        <Cart />
      </Route>

    </div>
  );
}

function Card(props){

  let history = useHistory();
  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.product.id) }}>

      <img src={ props.product.coverImage} width="100%" height="70%"/>
      <h4>{ props.product.title}</h4>
      <p>{ props.product.price}원</p>
    </div>
  )
}


export default App;
