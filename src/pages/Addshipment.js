import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Button from 'react-bootstrap/Button';
import "./style.scss";
import { useHistory } from 'react-router-dom';
import React, { useContext } from "react";
import { AppContext } from "../AppContext";



 export const Addshipment = (props) => {
    const { userId } = props.location.state;
    const appContext = useContext(AppContext);
    const { refetch } = appContext;
    const history = useHistory();
    const addshipmentMutationGQL = gql`
    mutation addshipment($name: String!, $address: String!, $phone: String, $user_id: String) {
    addshipment( name: $name, address: $address, phone: $phone, user_id: $user_id ) {
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
const [addshipment, { data }] = useMutation(addshipmentMutationGQL);
    return (
        <div className="base-container" >
        <div className="content mt-4">
          <h1>Add Shipment</h1>
          
          <form onSubmit={e => {
          e.preventDefault();
          addshipment({ variables: { name: name.value, address: address.value, phone: phone.value
            , user_id: userId } });
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
          }} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input name="adress" ref={node => {
            address = node;
          }} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input name="phone" ref={node => {
            phone = node;
          }} />
            </div>
          </div>
        
        <div className="footer text-center">
          <Button variant="primary" type="submit" >
            Add
          </Button>
        </div>
        </form>
        </div>
        
      </div>
    )
}


