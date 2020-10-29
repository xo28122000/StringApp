import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar/index";

import BandSearch from "./screens/BandSearch";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "./components/Dropdown/Dropdown";

const App = (props) => {
  return (
    <div>
      String
      <div>
        <Navbar />
        <Filter />
        <Switch>
          <Route path="/">
            <BandSearch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
