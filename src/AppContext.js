import React from "react";
import { useHistory } from 'react-router-dom';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
const AppContext = React.createContext();
const AppProvider = (props) => {

const history = useHistory();

    const user_id = sessionStorage.getItem('user_id'); 
    const GET_SHIPMENTS = gql`
    query GetShipments($user_id: ID) {
    shipments_by_user(user_id: $user_id) {
      id
      name 
      address 
      phone 
      waybill {
        id 
        from 
        to 
        price 
      }
    }
  }
`;
const x = 0; 
const { loading, error, data, refetch } = useQuery(GET_SHIPMENTS, {
    variables: { user_id: sessionStorage.getItem('user_id') }
  });






  return (
    <AppContext.Provider
      value={{
        
        history,
        refetch, 
        data, 
        error, 
        loading
        
        
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };