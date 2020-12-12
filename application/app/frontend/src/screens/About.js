import React from "react";
import saxophoneplay from "../assets/saxophoneplay.svg";
import bro from "../assets/bro.svg";
import bandjam from "../assets/bandjam.svg";
import aboutbackground from "../assets/aboutbackground.svg";







import jainamProfileImage from "../assets/jainam-profile-image.jpeg";
import Shinypichighrez from "../assets/Shinypichighrez.png";
import riteshProfileImage from "../assets/ritesh-profile-image.jpeg";
import warrenProfileImage from "../assets/ws-profile-image.jpg";
import leonidProfileImage from "../assets/leonid-ProfPic.jpg";


 const About = () => {
   return (
    <div><div style={{ marginBottom: 20 }}>
    <img src={aboutbackground} style={{ width: 1000, maxHeight: 1000 }} />
  </div>
      <h1>Story</h1> String is a Full Stack application, a project born out of a team effort from CSC 648 Software Engineering class at San Francisco State University.

Together we delivered this working prototype while conducting periodic milestone checkings during the 2020 spring semester.

<black><underline>Preview milestones</underline></black>
<italic><black>Stack:</black> Aws, SQL, Express, React.js, Node</italic>


              <div style={{ marginBottom: 20 }}>
                <img src={saxophoneplay} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h1>Features</h1> <break>#1 create, grow, and communicate with their local fan base 
              #2  search for bands & music events nearby
              #3 browse and listen to band portfolios directly on the page
              #4 bands can manage events and their music repertoire
              #5 String also serves as an informational medium for fans to access posts and keep a close look on their favorite band’s media page
              #6 fans can access the upcoming and past events and see what songs the band will play
              #7 join bands by directly sending an invitation to bands who are recruiting.</break>

              <div style={{ marginBottom: 20 }}>
                <img src={bro} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h1>Meet the team</h1>
              <div style={{ marginBottom: 20 }}>
                <img src={leonidProfileImage} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h2>Leonid Novoselov</h2> Frontend Developer
              <div style={{ marginBottom: 20 }}>
                <img src={warrenProfileImage} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h2>Warren Singh</h2> Backend Lead
              <div style={{ marginBottom: 20 }}>
                <img src={riteshProfileImage} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h2>Ritesh Panta</h2> Backend Developer
              <div style={{ marginBottom: 20 }}>
                <img src={Shinypichighrez} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h2>Alfredo Diaz</h2> Frontend Lead
                <div style={{ marginBottom: 20 }}>
                <img src={jainamProfileImage} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h2>Jainam Shah</h2> Team Lead
              <div style={{ marginBottom: 20 }}>
                <img src={bandjam} style={{ width: 500, maxHeight: 500 }} />
              </div>
            

    </div>
   );
 };

export default About

