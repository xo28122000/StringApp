import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../components/Navbar";

import "../css/Profile.css";

import emailIcon from "../assets/email.svg";
import facebookIcon from "../assets/facebook.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";

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
          <h1 className="name-header">
            {props.profile.firstName}
            <br />
            {props.profile.lastName}
          </h1>
          <p className="position-header">{props.profile.position}</p>
          {/* MAIN FLEX CONTAINER  */}
          <div className="profile-container">
            {/* TEAM MEMBER FLEX CARD #1*/}
            <div className="profile-member-card">
              {/* TEAM MEMBER PROFILE IMAGE */}
              <div>
                <img
                  className="member-image"
                  src={props.profile.imgSrc}
                  alt="Jose H. Gonzalez Profile Image"
                />
              </div>
              {/* TEAM MEMBER SOCIAL LINKS */}
              <div className="social-links-container">
                <a className="social-icon" href={props.profile.emailLink}>
                  email
                  <img
                    classNameName="icon"
                    src={emailIcon}
                    alt="Right Arrow Button"
                  />
                </a>
                {/* making bacebook optional */}
                {props.profile.facebookLink ? (
                  <a className="social-icon" href={props.profile.facebookLink}>
                    <img
                      classNameName="icon"
                      src={facebookIcon}
                      alt="Right Arrow Button"
                    />
                  </a>
                ) : null}
                <a className="social-icon" href={props.profile.githubLink}>
                  <img
                    classNameName="icon"
                    src={githubIcon}
                    alt="Right Arrow Button"
                  />
                </a>
                <a className="social-icon" href={props.profile.linkedinLink}>
                  <img
                    classNameName="icon"
                    src={linkedinIcon}
                    alt="Right Arrow Button"
                  />
                </a>
              </div>
              {/* TEAM MEMBER NAME & POSITION */}
              <div>
                <p className="member-introduction">
                  {props.profile.aboutMe_one}
                </p>
                <p className="member-introduction">
                  {props.profile.aboutMe_two}
                </p>
              </div>
            </div>
          </div>
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
