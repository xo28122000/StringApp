import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Button, NavLink } from "reactstrap";

import "./navbar.css";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <nav className="nav">
        <img className="nav-logo" src={require("./logo192.png")} alt="logo" />

        <ul className="leftLink">
          <li>
            <a>About</a>
          </li>
        </ul>
        <ul className="rightLink">
          <li>
            <a>Log in</a>
          </li>
          <li>
            <Button color="light" to="../screens/Register">
              Sign up
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Example;
