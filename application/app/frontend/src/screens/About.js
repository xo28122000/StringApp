import React from "react";
import saxophoneplay from "../assets/saxophoneplay.svg";
import bro from "../assets/bro.svg";
import bandjam from "../assets/bandjam.svg";


import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";




import jainamProfileImage from "../assets/jainam-profile-image.jpeg";
import alfredoProfileImage from "../assets/alfredo-profile-image.jpg";
import riteshProfileImage from "../assets/ritesh-profile-image.jpeg";
import warrenProfileImage from "../assets/ws-profile-image.jpg";
import leonidProfileImage from "../assets/leonid-ProfPic.jpg";


const About = () => {
  return (
    <div>
      About Screen: should contain what our product is, how can users use it and
      what is our goal. 
              <div style={{ marginBottom: 20 }}>
                <img src={saxophoneplay} style={{ width: 500, maxHeight: 500 }} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <img src={bro} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <img src={bandjam} style={{ width: 500, maxHeight: 500 }} />
              </div>
            

    </div>
  );
};



const about = (props) => {
  const teamMembers = [
    {
      firstName: "Jainam",
      lastName: "Shah",
      name: "Jainam Shah",
      position: "Team Lead",
      imgSrc: jainamProfileImage,
      emailLink: "mailto: jshah3@mail.sfsu.edu",
      facebookLink: null,
      githubLink: "https://github.com/xo28122000",
      linkedinLink: "https://www.linkedin.com/in/jainam-s/",
      aboutMe_one:
        "Hey all, I am a full stack dev and I LOVE NODE.JS (React.js and Express.js)",
      aboutMe_two:
        "Junior (Graduating Dec 2021), Comp Sci major, Capricorn, searching for internships, love playing ping pong",
    },
    {
      firstName: "Alfredo",
      lastName: "Diaz",
      name: "Alfredo Diaz",
      position: "Front end Lead",
      imgSrc: alfredoProfileImage,
      emailLink: "mailto: adiaz34@mail.sfsu.edu",
      facebookLink: null,
      githubLink: "https://github.com/alfredopastasauce",
      linkedinLink: "https://www.linkedin.com/in/alfredodiaz1/",
      aboutMe_one:
        "I like working on products that are meaningful, also my phone is always on 1%",
      aboutMe_two: "cofounder @ DarDenApp.com ",
    },
    
    {
      firstName: "Leonid",
      lastName: "Novoselov",
      name: "Leonid Novoselov",
      position: "Frontend Developer | DB Master",
      imgSrc: leonidProfileImage,
      emailLink: "mailto: lnovoselov@mail.sfsu.edu",
      facebookLink: null,
      githubLink: "https://github.com/leonidnovoselov",
      linkedinLink: null,
      aboutMe_one:
        "I live in SF. I just love this city. My big thing is backpacking. I love to go around California and discovering beautiful passages.",
      aboutMe_two:
        "I feel very pationate about this project. I think it's going to be a great and valuable experience. An opportunity to grow as a developers as well as professionals.",
    },
    {
      firstName: "Ritesh",
      lastName: "Panta",
      name: "Ritesh Panta",
      position: "Backend Lead",
      imgSrc: riteshProfileImage,
      emailLink: "mailto: rpanta1@mail.sfsu.edu",
      facebookLink: "https://www.facebook.com/ritesh.panta",
      githubLink: "https://github.com/rcode9",
      linkedinLink: "https://www.linkedin.com/in/ritesh-raj-panta/",
      aboutMe_one:
        "I am a senior year student at SFSU, hopefully I will graduate in 1 year and get a CS related job.",
      aboutMe_two:
        "I wish to learn a lot from this group project and contribute with all my will power to give my best.",
    },
    {
      firstName: "Warren",
      lastName: "Singh",
      name: "Warren Singh",
      position: "Backend Developer | Documentation",
      imgSrc: warrenProfileImage,
      emailLink: "mailto: wsingh@mail.sfsu.edu",
      facebookLink: null,
      githubLink: "https://github.com/wsmarshall",
      linkedinLink: null,
      aboutMe_one: "Gemini. Introvert. Perpetual beginner.",
      aboutMe_two: "Often flailing.",
    },
    
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
        {teamMembers.map((teamMember) => {
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



export default About


