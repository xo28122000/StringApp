import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Navbar from "./components/Navbar/index";

import ExampleScreen1 from "./screens/ExampleScreen1";
import ExampleScreen2 from "./screens/ExampleScreen2";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = props => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/someroute">
          <ExampleScreen1 />
        </Route>
        <Route path="/">
          <ExampleScreen2 />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
