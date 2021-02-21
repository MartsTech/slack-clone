import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <>
          <Header />
          <AppBody>
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

const AppBody = styled.div``;
