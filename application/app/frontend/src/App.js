import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Navbar from "./components/Navbar/index";

import BandSearch from "./screens/BandSearch";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "./components/Dropdown/Dropdown";

const App = props => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/">
          <BandSearch />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
