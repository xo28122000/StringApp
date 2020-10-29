import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Filter = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Genre</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Rock</DropdownItem>
        <DropdownItem>Rock</DropdownItem>
        <DropdownItem>Rock</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter;
