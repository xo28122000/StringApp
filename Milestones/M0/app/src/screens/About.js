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
      position: "Frontend Developer",
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
      position: "Developer | Documentation",
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

      {/* HORIZONTAL LEFT SCROLL ARROW */}
      <button className="left-arrow">
        <img className="arrow" src={leftArrow} alt="Left Arrow Button" />
      </button>

      {/* MAIN FLEX CONTAINER */}
      <div className="container">
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
      </div>
      {/* HORIZONTAL RIGHT SCROLL ARROW */}
      <button className="right-arrow">
        <img className="arrow" src={rightArrow} alt="Right Arrow Button" />
      </button>

      {/* ALLOWS USERS TO CLICK ARROWS TO MOVE TEAMMATE CARDS (INSTEAD OF SCROLLING)  */}
      {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script type="text/javascript">
        $('.right-arrow').click(function() {
          event.preventDefault();
        $('.container').animate({
          scrollLeft: "+=300px"
        }, "slow");
      });

      $('.left-arrow').click(function() {
          event.preventDefault();
        $('.container').animate({
          scrollLeft: "-=300px"
        }, "slow");
      });
    </script> */}
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

// TEAM MEMBER FLEX CARD #1
//         <a href="#" className="hyperlink-reset">
//           <div className="member-card">
//             {/* TEAM MEMBER PROFILE IMAGE */}
//             <div className="member-profile-image">
//               <img
//                 className="profile-image"
//                 src=""
//                 alt="Jainam H. Shah Profile Image"
//               />
//             </div>
//             {/* TEAM MEMBER NAME & POSITION */}
//             <div className="member-name-position">
//               <p className="member-name">Jainam H. Shah</p>
//               <p className="member-position">Frontend Lead</p>
//             </div>
//           </div>
//         </a>

//         {/* TEAM MEMBER FLEX CARD #2*/}
//         <a href="#" className="hyperlink-reset">
//           <div className="member-card">
//             {/* TEAM MEMBER PROFILE IMAGE */}
//             <div className="member-profile-image">
//               <img
//                 className="profile-image"
//                 src={joseProfileImage}
//                 alt="Jose Gonzalez Profile Image"
//               />
//             </div>
//             {/* TEAM MEMBER NAME & POSITION */}
//             <div className="member-name-position">
//               <p className="member-name">Jose H. Gonzalez</p>
//               <p className="member-position">Team Lead</p>
//             </div>
//           </div>
//         </a>

//         {/* TEAM MEMBER FLEX CARD #3*/}
//         <a href="#" className="hyperlink-reset">
//           <div className="member-card">
//             {/* TEAM MEMBER PROFILE IMAGE */}
//             <div className="member-profile-image">
//               <img
//                 className="profile-image"
//                 src=""
//                 alt="Leonid Novoselov Profile Image"
//               />
//             </div>
//             {/* TEAM MEMBER NAME & POSITION */}
//             <div className="member-name-position">
//               <p className="member-name">Leonid Novoselov</p>
//               <p className="member-position">Frontend Developer</p>
//             </div>
//           </div>
//         </a>

//         {/* TEAM MEMBER FLEX CARD #4*/}
//         <a href="#" className="hyperlink-reset">
//           <div className="member-card">
//             {/* TEAM MEMBER PROFILE IMAGE */}
//             <div className="member-profile-image">
//               <img
//                 className="profile-image"
//                 src=""
//                 alt="Ritesh Panta Profile Image"
//               />
//             </div>
//             {/* TEAM MEMBER NAME & POSITION */}
//             <div className="member-name-position">
//               <p className="member-name">Ritesh Panta</p>
//               <p className="member-position">Backend Lead</p>
//             </div>
//           </div>
//         </a>

//         {/* TEAM MEMBER FLEX CARD #5*/}
//         <a href="#" className="hyperlink-reset">
//           <div className="member-card">
//             {/* TEAM MEMBER PROFILE IMAGE */}
//             <div className="member-profile-image">
//               <img
//                 className="profile-image"
//                 src=""
//                 alt="Warren Singh Profile Image"
//               />
//             </div>
//             {/* TEAM MEMBER NAME & POSITION */}
//             <div className="member-name-position">
//               <p className="member-name">Warren Singh</p>
//               <p className="member-position">Developer | Documentation</p>
//             </div>
//           </div>
//         </a>

//         {/* TEAM MEMBER FLEX CARD #6*/}
//         <a href="#" className="hyperlink-reset">
//           <div className="member-card">
//             {/* TEAM MEMBER PROFILE IMAGE */}
//             <div className="member-profile-image">
//               <img
//                 className="profile-image"
//                 src=""
//                 alt="Xuanjun Chen Profile Image"
//               />
//             </div>
//             {/* TEAM MEMBER NAME & POSITION */}
//             <div className="member-name-position">
//               <p className="member-name">Xuanjun Chen</p>
//               <p className="member-position">Backend Developer | Github</p>
//             </div>
//           </div>
//         </a>
