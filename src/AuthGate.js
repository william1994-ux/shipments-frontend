import React, {useEffect, useState} from "react";
import { useUserQuery } from "./network/userQuery";
import Private from "./pages/Private";
import AuthenticationForm from "./pages/AuthenticationForm";
import { useAuthToken } from "./config/auth";
import { useLocation } from 'react-router-dom';


export const AuthGate = () => {

  const [authToken] = useAuthToken()
  const {loading, data, error,  refetch} = useUserQuery(); 
  console.log(data); 
  const userData = useUserQuery(); 
  let location = useLocation();
  
useEffect(() => {
if(data == null) {
 console.log('hello'); 
}
}, [data])
  // program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str) {

  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

  if (userData.data && authToken && location.pathname == "/") {
    if(data.me !== null) {
      console.log('maydata', data); 
    sessionStorage.setItem('user_id', userData.data.me.id);
    return <Private user={userData.data.me} />;
  }
    else {
      return <h1>please reload the page to login </h1> ; 
    }
  }
  
  else if (userData.data && authToken && location.pathname !== "/") {
    let component = capitalizeFirstLetter(location.pathname);
    return <component />; 

  }
  else {
  return <AuthenticationForm loading={userData.loading} />;
  }
};
