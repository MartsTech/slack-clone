import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Chat } from "../components/Chat";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { auth } from "../firebase";
import Login from "./Login";
import Spinner from "react-spinkit";

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="loading" />

          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Chat />
          </AppBody>
        </>
      )}
    </>
  );
};

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
