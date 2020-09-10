import React from "react";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/actions";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";

import "../css/About.css";

import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import joseProfileImage from "../assets/jose-profile-image.JPG";
import jainamProfileImage from "../assets/jainam-profile-image.jpeg";
import placeholder from "../assets/placeholder.jpg";

const AboutScreen = props => {

  const teamMembers = [
    {
      firstName: "Jainam",
      lastName: "Shah",
      name: "Jainam Shah",
      position: "Frontend Lead",
      imgSrc: jainamProfileImage,
      emailLink: "",
      facebookLink: "",
      githubLink: "",
      linkedinLink: "",
      aboutMe_one: "This is a little about me... paragraph one",
      aboutMe_two: "This is a little about me... paragraph two"
    },
    {
      firstName: "Jose",
      lastName: "Gonzalez",
      name: "Jose H. Gonzalez",
      position: "Team Lead",
      imgSrc: joseProfileImage,
      emailLink: "mailto: gonzalezhilariojose@gmail.com",
      facebookLink: "https://www.facebook.com/gonzalezhilariojose",
      githubLink: "https://github.com/Hilarioo",
      linkedinLink: "https://www.linkedin.com/in/hilariooo/",
      aboutMe_one: "Hey! I have recently become a San Francisco Gator! I transitioned to SFSU from Los Medanos Community College. I will be graduating Spring 2021 with a Bachelor of Science. I am full of random facts that have no purpose other than bringing them up during conversations. I am also known as the 'go-to' person when it comes to troubleshooting my home Wi-Fi (hint: reset the modem).",
      aboutMe_two: "During this next year, I will be seeking a Computer Science Internships where I can further expand my intellect and further sharpen my skills, while simultaneously contributing to the team!! "
    },
    {
      firstName: "Leonid",
      lastName: "Novoselov",
      name: "Leonid Novoselov",
      position: "Frontend Developer | DB Master",
      imgSrc: placeholder,
      emailLink: "",
      facebookLink: "",
      githubLink: "",
      linkedinLink: "",
      aboutMe_one: "This is a little about me... paragraph one",
      aboutMe_two: "This is a little about me... paragraph two"
    },
    {
      firstName: "Ritesh",
      lastName: "Panta",
      name: "Ritesh Panta",
      position: "Backend Lead",
      imgSrc: placeholder,
      emailLink: "",
      facebookLink: "",
      githubLink: "",
      linkedinLink: "",
      aboutMe_one: "This is a little about me... paragraph one",
      aboutMe_two: "This is a little about me... paragraph two"
    },
    {
      firstName: "Warren",
      lastName: "Singh",
      name: "Warren Singh",
      position: "Frontend Developer | Documentation",
      imgSrc: placeholder,
      emailLink: "",
      facebookLink: "",
      githubLink: "",
      linkedinLink: "",
      aboutMe_one: "This is a little about me... paragraph one",
      aboutMe_two: "This is a little about me... paragraph two"
    },
    {
      firstName: "Xuanjun",
      lastName: "Chen",
      name: "Xuanjun Chen",
      position: "Backend Developer | Github",
      imgSrc: placeholder,
      emailLink: "",
      facebookLink: "",
      githubLink: "",
      linkedinLink: "",
      aboutMe_one: "This is a little about me... paragraph one",
      aboutMe_two: "This is a little about me... paragraph two"
    }
  ];

  return (
    <div>
      <Navbar img={false} textColor={"#000000"} />
      <h1 className="page-header">
        THE
        <br />
        TEAM
      </h1>

      {/* MAIN FLEX CONTAINER */}
      <div className="about-container">
        {/* HORIZONTAL LEFT SCROLL ARROW
        <a className="left-arrow">
          <img className="arrow" src={leftArrow} alt="Left Arrow Button" />
        </a> */}
        {teamMembers.map(teamMember => {
          return (
            <Link
              key={teamMember.name}
              to="/profile"
              className="hyperlink-reset"
              onClick={() => {
                props.setProfile(teamMember);
              }}
            >
              <div className="member-card">
                {/* TEAM MEMBER PROFILE IMAGE */}
                <div className="member-profile-image">
                  <img
                    className="profile-image"
                    src={teamMember.imgSrc}
                    alt={teamMember.name + " Profile Image"}
                  />
                </div>
                {/* TEAM MEMBER NAME & POSITION */}
                <div className="member-name-position">
                  <p className="member-name">{teamMember.name}</p>
                  <p className="member-position">{teamMember.position}</p>
                </div>
              </div>
            </Link>
          );
        })}
        {/* HORIZONTAL RIGHT SCROLL ARROW
        <a className="right-arrow" >
          <img className="arrow" src={rightArrow} alt="Right Arrow Button" />
        </a> */}
      </div>

      {/* ALLOWS USERS TO CLICK ARROWS TO MOVE TEAMMATE CARDS (INSTEAD OF SCROLLING)  */}

    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setProfile: profile => dispatch(setProfile(profile))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AboutScreen);