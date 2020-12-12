import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";

import AboutPage from "./screens/About";
import ExplorePage from "./screens/Explore";
import BandProfilePage from "./screens/BandProfile";
import UserProfilePage from "./screens/UserProfile";
import RegisterPage from "./screens/Register";
import TermsAndConditionPage from "./screens/TermsAndCondition";
import DataPolicyPage from "./screens/DataPolicy";
import FAQPage from "./screens/FAQ";
import ContactUsPage from "./screens/ContactUs";

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
        <Route path="/FAQ">
          <FAQPage />
        </Route>
        <Route path="/contact">
          <ContactUsPage />
        </Route>
        <Route path="/data_policy">
          <DataPolicyPage />
        </Route>
        <Route path="/terms_and_conditions">
          <TermsAndConditionPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/profile">
          <UserProfilePage />
        </Route>
        <Route exact path="/band/:bandName">
          <BandProfilePage />
        </Route>
        <Route path="/band">
          <BandProfilePage />
        </Route>
        <Route path="/explore">
          <ExplorePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <Redirect to="/about" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
