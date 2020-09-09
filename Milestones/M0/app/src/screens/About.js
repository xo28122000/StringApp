import React from "react";
import Navbar from "../components/Navbar";
import '../css/About.css';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import joseProfileImage from '../assets/jose-profile-image.JPG';

const AboutScreen = () => {
  return (
    <div>
      <Navbar img={false} textColor={"#000000"} />
      <h1 class="the-team-header">THE<br />TEAM </h1>

      {/* HORIZONTAL LEFT SCROLL ARROW */}
      <button class="left-arrow">
        <img class="arrow" src={leftArrow} alt="Left Arrow Button" />
      </button>

      {/* MAIN FLEX CONTAINER */}
      <div class="container">

        {/* TEAM MEMBER FLEX CARD #1*/}
        <a href="#" class="hyperlink-reset">
          <div class="member-card">
            {/* TEAM MEMBER PROFILE IMAGE */}
            <div class="member-profile-image">
              <img class="profile-image" src="" alt="Jainam H. Shah Profile Image" />
            </div>
            {/* TEAM MEMBER NAME & POSITION */}
            <div class="member-name-position">
              <p class="member-name">Jainam H. Shah</p>
              <p class="member-position">Frontend Lead</p>
            </div>
          </div>
        </a>

        {/* TEAM MEMBER FLEX CARD #2*/}
        <a href="#" class="hyperlink-reset">
          <div class="member-card">
            {/* TEAM MEMBER PROFILE IMAGE */}
            <div class="member-profile-image">
              <img class="profile-image" src={joseProfileImage} alt="Jose Gonzalez Profile Image" />
            </div>
            {/* TEAM MEMBER NAME & POSITION */}
            <div class="member-name-position">
              <p class="member-name">Jose H. Gonzalez</p>
              <p class="member-position">Team Lead</p>
            </div>
          </div>
        </a>

        {/* TEAM MEMBER FLEX CARD #3*/}
        <a href="#" class="hyperlink-reset">
          <div class="member-card">
            {/* TEAM MEMBER PROFILE IMAGE */}
            <div class="member-profile-image">
              <img class="profile-image" src="" alt="Leonid Novoselov Profile Image" />
            </div>
            {/* TEAM MEMBER NAME & POSITION */}
            <div class="member-name-position">
              <p class="member-name">Leonid Novoselov</p>
              <p class="member-position">Frontend Developer</p>
            </div>
          </div>
        </a>

        {/* TEAM MEMBER FLEX CARD #4*/}
        <a href="#" class="hyperlink-reset">
          <div class="member-card">
            {/* TEAM MEMBER PROFILE IMAGE */}
            <div class="member-profile-image">
              <img class="profile-image" src="" alt="Ritesh Panta Profile Image" />
            </div>
            {/* TEAM MEMBER NAME & POSITION */}
            <div class="member-name-position">
              <p class="member-name">Ritesh Panta</p>
              <p class="member-position">Backend Lead</p>
            </div>
          </div>
        </a>

        {/* TEAM MEMBER FLEX CARD #5*/}
        <a href="#" class="hyperlink-reset">
          <div class="member-card">
            {/* TEAM MEMBER PROFILE IMAGE */}
            <div class="member-profile-image">
              <img class="profile-image" src="" alt="Warren Singh Profile Image" />
            </div>
            {/* TEAM MEMBER NAME & POSITION */}
            <div class="member-name-position">
              <p class="member-name">Warren Singh</p>
              <p class="member-position">Developer | Documentation</p>
            </div>
          </div>
        </a>

        {/* TEAM MEMBER FLEX CARD #6*/}
        <a href="#" class="hyperlink-reset">
          <div class="member-card">
            {/* TEAM MEMBER PROFILE IMAGE */}
            <div class="member-profile-image">
              <img class="profile-image" src="" alt="Xuanjun Chen Profile Image" />
            </div>
            {/* TEAM MEMBER NAME & POSITION */}
            <div class="member-name-position">
              <p class="member-name">Xuanjun Chen</p>
              <p class="member-position">Backend Developer | Github</p>
            </div>
          </div>
        </a>

      </div>
      {/* HORIZONTAL RIGHT SCROLL ARROW */}
      <button class="right-arrow">
        <img class="arrow" src={rightArrow} alt="Right Arrow Button" />
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

export default AboutScreen;
