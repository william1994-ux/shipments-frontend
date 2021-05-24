import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Button from 'react-bootstrap/Button';
import "./style.scss";
import { useHistory } from 'react-router-dom';
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useQuery } from "@apollo/react-hooks";




 export const Updatewaybill = (props) => {
    const { waybillId } = props.location.state;
    const id = parseInt(waybillId); 
    const appContext = useContext(AppContext);
    const { refetch } = appContext;
    const history = useHistory();
    const [data1, setData1] = useState([]);
    

const GET_WAYBILL = gql`
  query waybill($id: ID) {
    waybill(id: $id) {
      id
      from 
      to 
      price 
    }
  }
`;
const { loading, error, data } = useQuery(GET_WAYBILL, {
  variables: { id: id }
});
 
console.log(loading); 
console.log(error);
console.log(data); 
useEffect(() => {
  if ( typeof data !== "undefined") {
      setData1 (data.waybill);
      console.log(data1.id); 
  }
  
},[data]);


    const updatewaybillMutationGQL = gql`
    mutation updatewaybill($id: ID, $from: String, $to: String, $price: String) {
    updatewaybill( id: $id, from: $from, to: $to, price: $price ) {
      id 
      from 
      to
      price
    }
  }
`;
let from;
let to; 
let price;
const [updatewaybill] = useMutation(updatewaybillMutationGQL);
 
    return (
        <div className="base-container" >
        { (data1 && data1 !== {} && data1.id !== null) &&
        <div className="content mt-4">
          <h1>Update Waybill</h1>
          
          <form onSubmit={e => {
          e.preventDefault();
          updatewaybill({ variables: { id, from: from.value, to: to.value, price: price.value
         } });
          from.value = '';
          to.value = '';
          price.value = '';
          refetch();
          history.push('/'); 
        }}>
          <div className="form">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input name="from" ref={node => {
            from = node;
            
          }}
           defaultValue={data1.from }
               
           />
           {console.log(data1.from)}
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input name="to" ref={node => {
            to = node;
            
          }}
          defaultValue={data1.to}
           />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($) </label>
              <input name="price" ref={node => {
            price = node;
            
          }} 
          defaultValue={data1.price}
          />
            </div>
          </div>
        
        <div className="footer text-center">
          <Button variant="primary" type="submit" >
            Update
          </Button>
        </div>
        </form>
        </div>
        }
        
      </div>
    )
}


