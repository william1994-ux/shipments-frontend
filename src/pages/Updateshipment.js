import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Button from 'react-bootstrap/Button';
import "./style.scss";
import { useHistory } from 'react-router-dom';
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useQuery } from "@apollo/react-hooks";
import { useLazyQuery } from '@apollo/react-hooks';




 export const Updateshipment = (props) => {
    const { shipmentId } = props.location.state;
    const id = parseInt(shipmentId); 
    const appContext = useContext(AppContext);
    const { refetch } = appContext;
    const history = useHistory();
    const [data1, setData1] = useState([]);

    const updateshipmentMutationGQL = gql`
    mutation updateshipment($id: ID, $name: String!, $address: String, $phone: String) {
    updateshipment( id: $id, name: $name, address: $address, phone: $phone ) {
      id 
      name 
      address
      phone
    }
  }
`;
let name;
let address; 
let phone;
const [updateshipment] = useMutation(updateshipmentMutationGQL);

    

const GET_SHIPMENT = gql`
  query shipment($id: ID) {
    shipment(id: $id) {
      id
      name 
      address 
      phone 
    }
  }
`;
const { loading, error, data } = useQuery(GET_SHIPMENT, {
  variables: { id: id }
});

console.log(loading); 
console.log(error); 
console.log(data); 
useEffect(() => {
    if ( typeof data !== "undefined") {
        setData1 (data.shipment);
    }
    
  },[data]);



    
 
    return (
       
        <div className="base-container" >
         { (data1 && data1 !== {} && data1.name !== null) &&
        <div className="content mt-4">
          <h1>Update Shipment</h1>
          
          <form onSubmit={e => {
          e.preventDefault();
          updateshipment({ variables: { id, name: name.value, address: address.value, phone: phone.value
         } });
          name.value = '';
          address.value = '';
          phone.value = '';
          refetch();
          history.push('/'); 
        }}>
          <div className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" ref={node => {
            name = node;
            
          }}
           defaultValue={data1.name }/>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input name="adress" ref={node => {
            address = node;
            
          }}
          defaultValue={data1.address}
           />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input name="phone" ref={node => {
            phone = node;
            
          }} 
          defaultValue={data1.phone}
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


