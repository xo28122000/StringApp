import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

import "./navbar.css";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" expand="md">
        <img />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="">About</NavLink>
            </NavItem>
          </Nav>

          <NavLink color="light" href="">
            Log in
          </NavLink>

          <NavLink href="">Sigh up</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
