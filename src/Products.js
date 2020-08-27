import React from "react";
import { useHistory } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { connect } from "react-redux";

function Products(props) {

  let history = useHistory();
  let target_item = props.product.find(x => x.id == props.id);

  // function desc_sort(product){
    
  //   const result = product.sort((a, b) => b.score > a.score ? 1 : -1)
  //   return result
  
  // }

  return (
    <div>
      {/* { product = desc_sort(product) } */}
      {/* {product = desc_sort(product)} */}
      <Jumbotron fluid>
        <Container>
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
          </p>
        </Container>
    </Jumbotron>
      {
        props.product.map((a) => (

          <div className="container">
            <div className="col" onClick={()=>{ history.push('/detail/' + a.id) }}>
              <img src={ a.coverImage} width="50%" height="35%"/>
              <h4>{ a.title}</h4> 
              <p>{ a.price}원</p>
            </div>
            { props.state_btn === true
                ? ( <button onClick={()=>{
                      props.dispatch({type: 'btn_pressed', payload: {id:target_item.id, name : target_item.title,} });
                      history.push('/cart');
                    }}>담기</button>
                  )
                : ( <button>빼기</button> )
            }
          </div>
        ))
      }
    </div>
  );
}



// const Products = ({ id, product, props }) => {
//   let history = useHistory();
//   let target_item = product.find(x => x.id == id);

//   // function desc_sort(product){
    
//   //   const result = product.sort((a, b) => b.score > a.score ? 1 : -1)
//   //   return result
  
//   // }

//   return (
//     <div>
//       {/* { product = desc_sort(product) } */}
//       {/* {product = desc_sort(product)} */}
//       <Jumbotron fluid>
//         <Container>
//           <h1>Fluid jumbotron</h1>
//           <p>
//             This is a modified jumbotron that occupies the entire horizontal space of
//             its parent.
//           </p>
//         </Container>
//     </Jumbotron>
//       {
//         product.map((a) => (

//           <div className="container">
//             {/* <div className="row"> */}
//             <div className="col" onClick={()=>{ history.push('/detail/' + a.id) }}>
//               <img src={ a.coverImage} width="50%" height="35%"/>
//               <h4>{ a.title}</h4>
//               <p>{ a.price}원</p>

//               { props.state_btn === true
//                 ? ( <button>담기</button>)
//                 : ( <button>빼기</button>)
//               }
//               {/* <button className="btn btn-danger" onClick={()=>{
//                 props.dispatch({type : 'btn_pressed', payload : {id:target_item.id, name : target_item.title, quan : 1} });
//                 history.push('/cart');

//               }}>{}</button> */}
//             </div>
//             {/* </div> */}
//           </div>
          
//         ))
//       }
//     </div>
//   );

// };

function state_to_props(state){
  return {
      state : state.reducer,
      state_btn : state.reducer2,
  }
}

export default connect(state_to_props)(Products)

// export default Products;