import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../components/Navbar";

const ProfileScreen = props => {
  console.log(props);
  return (
    <div>
      <Navbar img={false} textColor={"#000000"} />
      {props && !props.profile ? (
        <Redirect to="/about" />
      ) : (
        <div>
          {/* use this div as your main parent div, dont use props.prfile outside this div or it'll give you errors */}
          {props.profile.name}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { profile: state.profile };
};

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
