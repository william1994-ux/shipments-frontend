import React from "react";
import "./App.css";
import {withRouter} from 'react-router';
import { AuthGate } from "./AuthGate";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAppApolloClient } from "./config/apolloClient";
import { Route, Switch } from 'react-router-dom';
import { AppProvider } from "./AppContext";
import { Addwaybill } from "./pages/Addwaybill";
import { Addshipment } from "./pages/Addshipment";
import { Updateshipment } from "./pages/Updateshipment"; 
import { Updatewaybill } from "./pages/Updatewaybill";

function App() {


  const apolloClient = useAppApolloClient();

  return (
    <Switch >
    
    <ApolloProvider client={apolloClient}>
    <AppProvider>
    <Route  path="/addwaybill" component={Addwaybill} />
    <Route  path="/addshipment" component={Addshipment} />
    <Route  path="/updateshipment" component={Updateshipment} />
    <Route  path="/updatewaybill" component={Updatewaybill} />
    
      <AuthGate />
      
      </AppProvider>
    </ApolloProvider>
    
    </Switch>
  );
}

export default App;
