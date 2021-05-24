import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <CookiesProvider>
    
        <App/>
        
    </CookiesProvider>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

