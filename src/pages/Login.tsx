import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Login: React.FC = () => {
  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" />
        <h1>Sign in now</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit;
    background: #0a8d48;
    color: white;
  }
`;
