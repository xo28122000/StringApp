import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Navbar from "./components/Navbar/index";

import ExplorePage from "./screens/Explore";
import BandProfilePage from "./screens/BandProfile";
import UserProfilePage from "./screens/UserProfile";
import RegisterPage from "./screens/Register";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = props => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/user">
          <UserProfilePage />
        </Route>
        <Route path="/band">
          <BandProfilePage />
        </Route>
        <Route path="/">
          <ExplorePage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
