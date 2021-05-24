import { useForm } from "react-hook-form";
import React from "react";
import { useLoginMutation } from "../network/loginMutation";
import "./style.scss";
import loginImg from "./login.svg";
import Button from 'react-bootstrap/Button';

const AuthenticationForm = ({ loading }) => {
  const [loginMutation, loginMutationResults] = useLoginMutation();
  const { handleSubmit, register } = useForm();

  const disableForm = loginMutationResults.loading || loading;

  const onSubmit = (values) => loginMutation(values.username, values.password);
  const username = register('username', { required: true });
  const password = register('password', { required: true });

  return (



    <div className="base-container" >
        <div className="content mt-4">
          <h1>Shipments Tracker</h1>
          <div className="image">
            <img src={loginImg} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input name="username" inputRef={username.ref} onChange={username.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" inputRef={password.ref} onChange={password.onChange} />
            </div>
          </div>
        
        <div className="footer text-center">
          <Button variant="primary" type="submit" disabled={disableForm} >
            Login
          </Button>
        </div>
        </form>
        </div>
        
      </div>



  );
};

export default AuthenticationForm;