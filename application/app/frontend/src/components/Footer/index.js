import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>Footer here</div>
      <div>
        <Link to="/about">about</Link>
      </div>
      <div>
        <Link to="/explore">explore</Link>
      </div>
      <div>
        <Link to="/contact">contact</Link>
      </div>
      <div>
        <Link to="/data_policy">data_policy</Link>
      </div>
      <div>
        <Link to="/terms_and_conditions">terms_and_conditions</Link>
      </div>
      <div>
        <Link to="/FAQ">FAQ</Link>
      </div>
    </div>
  );
};

export default Footer;
