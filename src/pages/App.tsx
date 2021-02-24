import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact />
            </Switch>
          </AppBody>
        </>
      </Router>
    </div>
  );
};

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
