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
            <h1 class="name-header">{props.profile.firstName}<br />{props.profile.lastName}</h1>
            <p class="position-header">{props.profile.position}</p>
            {/* MAIN FLEX CONTAINER  */}
            <div class="profile-container">
              {/* TEAM MEMBER FLEX CARD #1*/}
              <div class="profile-member-card">
                {/* TEAM MEMBER PROFILE IMAGE */}
                <div>
                  <img class="member-image" src={props.profile.imgSrc} alt="Jose H. Gonzalez Profile Image" />
                </div>
                {/* TEAM MEMBER SOCIAL LINKS */}
                <div class="social-links-container">
                  <a class="social-icon" href={props.profile.emailLink}>
                    <img className="icon" src={emailIcon} alt="Right Arrow Button" />
                  </a>
                  <a class="social-icon" href={props.profile.facebookLink}>
                    <img className="icon" src={facebookIcon} alt="Right Arrow Button" />
                  </a>
                  <a class="social-icon" href={props.profile.githubLink}>
                    <img className="icon" src={githubIcon} alt="Right Arrow Button" />
                  </a>
                  <a class="social-icon" href={props.profile.linkedinLink}>
                    <img className="icon" src={linkedinIcon} alt="Right Arrow Button" />
                  </a>
                </div>
                {/* TEAM MEMBER NAME & POSITION */}
                <div>
                  <p class="member-introduction">{props.profile.aboutMe_one}</p>
                  <p class="member-introduction">{props.profile.aboutMe_two}</p>
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
