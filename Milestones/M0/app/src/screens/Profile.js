import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../components/Navbar";

import "../css/Profile.css";

import emailIcon from "../assets/email.svg";
import facebookIcon from "../assets/facebook.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";
import joseProfileImage from "../assets/jose-profile-image.JPG";
import jainamProfileImage from "../assets/jainam-profile-image.jpeg";
import placeholder from "../assets/placeholder.jpg";

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
            {/* {props.profile.name} */}
            <h1 class="name-header">JOSE<br />GONZALEZ</h1>
            <p class="position-header">Team Lead</p>
            {/* MAIN FLEX CONTAINER  */}
            <div class="profile-container">
              {/* TEAM MEMBER FLEX CARD #1*/}
              <div class="profile-member-card">
                {/* TEAM MEMBER PROFILE IMAGE */}
                <div>
                  <img class="member-image" src={joseProfileImage} alt="Jose H. Gonzalez Profile Image" />
                </div>
                {/* TEAM MEMBER SOCIAL LINKS */}
                <div class="social-links-container">
                  <a class="social-icon">
                    <img className="icon" src={emailIcon} alt="Right Arrow Button" />
                  </a>
                  <a class="social-icon">
                    <img className="icon" src={facebookIcon} alt="Right Arrow Button" />
                  </a>
                  <a class="social-icon">
                    <img className="icon" src={githubIcon} alt="Right Arrow Button" />
                  </a>
                  <a class="social-icon">
                    <img className="icon" src={linkedinIcon} alt="Right Arrow Button" />
                  </a>
                </div>
                {/* TEAM MEMBER NAME & POSITION */}
                <div>
                  <p class="member-introduction">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    <br /> <br />
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
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
