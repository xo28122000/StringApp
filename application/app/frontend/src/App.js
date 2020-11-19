import React, { useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";
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

import { useDispatch } from "react-redux";
import { login } from "./redux/Actions/actions";
import Axios from "axios";

const App = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.post("/api/auth/user")
      .then(res => {
        if (res.data.success) {
          dispatch(login(res.data.user));
        }
      })
      .catch(err => {});
  }, []);

  return (
    <div style={{ backgroundColor: "#f6f6f6" }}>
      <Navbar />
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/profile">
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
