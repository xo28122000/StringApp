import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

const App = props => {
  return (
    <div id="App-root">
      <Router basename="/">
        <Switch>
          {/* <Route path="/business">
            <BusinessScreen />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
