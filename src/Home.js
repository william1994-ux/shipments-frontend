import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';




 function Home() {

  const [shipments, setShipments] = useState([]);
  
  const SHIPMENTS = gql`
  query GETSHIPMENTS {
    shipments {
      id
      name 
      address
      phone
    }
  }
`;
const { loading, error, data } = useQuery(SHIPMENTS);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;
  console.log(data); 
  
   
  
  

  return  (
      <h1>Home</h1>
  )
  }
  


export default Home;
