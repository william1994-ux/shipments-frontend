import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

export const useShipmentsQuery = () => useQuery(GET_SHIPMENTS);