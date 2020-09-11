import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../components/Navbar";

import "../css/Profile.css";

import emailIcon from "../assets/email.svg";
import facebookIcon from "../assets/facebook.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";
import instagramIcon from "../assets/instagram.svg";

const ProfileScreen = props => {
  return (
    <div>
      <Navbar
        img={false}
        textColor={"#000000"}
        leftComponent={
          <Link to="/about">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ fontSize: 20, color: "#000000" }}
            />
          </Link>
        }
      />
      {props && !props.profile ? (
        <Redirect to="/about" />
      ) : (
        <div>
          {/* use this div as your main parent div, dont use props.prfile outside this div or it'll give you errors */}
          {/* <div style={{ marginLeft: 40, marginTop: 80 }}>
            <Link to="/about">
              <FontAwesomeIcon
                icon={faTimes}
                style={{ fontSize: 20, color: "#000000" }}
              />
            </Link>
          </div> */}
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
                  alt={props.profile.firstName + " Profile Image"}
                />
              </div>
              {/* TEAM MEMBER SOCIAL LINKS */}
              <div className="social-links-container">
                <div style={{ marginLeft: 20, marginRight: 20 }}>
                  <a href={props.profile.emailLink}>
                    <img
                      style={{ height: 30, width: 30 }}
                      classNameName="icon"
                      src={emailIcon}
                      alt="Right Arrow Button"
                    />
                  </a>
                </div>
                {/* making facebook optional */}
                {props.profile.facebookLink ? (
                  <div style={{ marginLeft: 20, marginRight: 20 }}>
                    <a href={props.profile.facebookLink}>
                      <img
                        style={{ height: 30, width: 30 }}
                        classNameName="icon"
                        src={facebookIcon}
                        alt="Right Arrow Button"
                      />
                    </a>
                  </div>
                ) : null}
                {/* {props.profile.instagramLink ? (
                  <div style={{ marginLeft: 20, marginRight: 20 }}>
                    <a href={props.profile.instagramLink}>
                      <img
                        style={{ height: 30, width: 30 }}
                        classNameName="icon"
                        src={instagramIcon}
                        alt="Right Arrow Button"
                      />
                    </a>
                  </div>
                ) : null} */}
                <div style={{ marginLeft: 20, marginRight: 20 }}>
                  <a href={props.profile.githubLink}>
                    <img
                      style={{ height: 30, width: 30 }}
                      classNameName="icon"
                      src={githubIcon}
                      alt="Right Arrow Button"
                    />
                  </a>
                </div>
                <div style={{ marginLeft: 20, marginRight: 20 }}>
                  <a href={props.profile.linkedinLink}>
                    <img
                      style={{ height: 30, width: 30 }}
                      classNameName="icon"
                      src={linkedinIcon}
                      alt="Right Arrow Button"
                    />
                  </a>
                </div>
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
