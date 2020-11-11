import React from "react";
import { Jumbotron, Button } from "reactstrap";

const Space = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">One stop for everything bands realted</h1>
        <p className="lead">
          Browse events near by with live music, showcase all your music and
          work with posts and press mentions to make people find you easily,
          connect with other musicians to work together!
        </p>
        <p className="lead">
          <Button color="primary">Start Exploring</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Space;
