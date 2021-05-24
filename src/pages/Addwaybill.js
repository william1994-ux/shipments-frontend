import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Button from 'react-bootstrap/Button';
import "./style.scss";
import { useHistory } from 'react-router-dom';
import React, { useContext } from "react";
import { AppContext } from "../AppContext";




 export const Addwaybill = (props) => {
    const { shipmentId } = props.location.state;
    const history = useHistory();
    const appContext = useContext(AppContext);
    const { refetch } = appContext;
    const addwaybillMutationGQL = gql`
    mutation addwaybill($from: String!, $to: String!, $price: String, $shipment_id: String) {
    addwaybill( from: $from, to: $to, price: $price, shipment_id: $shipment_id ) {
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
const [addwaybill, { data }] = useMutation(addwaybillMutationGQL);
    return (
        <div className="base-container" >
        <div className="content mt-4">
          <h1>Add Waybill</h1>
          
          <form onSubmit={e => {
          e.preventDefault();
          addwaybill({ variables: { from: from.value, to: to.value, price: price.value
            , shipment_id: shipmentId } });
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
          }} />
            </div>
            <div className="form-group">
              <label htmlFor="to">to</label>
              <input name="to" ref={node => {
            to = node;
          }} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input name="price" ref={node => {
            price = node;
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


