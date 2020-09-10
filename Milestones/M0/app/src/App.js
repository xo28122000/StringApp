import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "./screens/Home";
import ContactScreen from "./screens/Contact";
import AboutScreen from "./screens/About";
import ProfileScreen from "./screens/Profile";

import "./App.css";

const App = props => {
  return (
    <div id="App-root">
      <Router basename="/">
        <Switch>
          <Route path="/profile">
            <ProfileScreen />
          </Route>
          <Route path="/contact">
            <ContactScreen />
          </Route>
          <Route path="/about">
            <AboutScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
