import React from "react";
import saxophoneplay from "../assets/saxophoneplay.svg";
import bro from "../assets/bro.svg";
import bandjam from "../assets/bandjam.svg";
import aboutbackground from "../assets/aboutbackground.svg";







// import jainamProfileImage from "../assets/jainam-profile-image.jpeg";
// import alfredoProfileImage from "../assets/alfredo-profile-image.jpg";
// import riteshProfileImage from "../assets/ritesh-profile-image.jpeg";
// import warrenProfileImage from "../assets/ws-profile-image.jpg";
// import leonidProfileImage from "../assets/leonid-ProfPic.jpg";


 const About = () => {
   return (
    <div><div style={{ marginBottom: 20 }}>
    <img src={aboutbackground} style={{ width: 1000, maxHeight: 1000 }} />
  </div>
      <h1>Story</h1> String is a Full Stack application project born out of a team effort from CSC 648 Software Engineering class at San Francisco State University.

Together we delivered periodic milestone checkings the spring or 2020.

Preview milestones

Stack: Aws, SQL, Express, React.js, Node 
              <div style={{ marginBottom: 20 }}>
                <img src={saxophoneplay} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h1>Benefits</h1> #1 bla
              #2 bla
              #3 bla
              <div style={{ marginBottom: 20 }}>
                <img src={bro} style={{ width: 500, maxHeight: 500 }} />
              </div>
              <h1>Meet the team</h1> #1 bla
              #2 bla
              #3 bla
              <div style={{ marginBottom: 20 }}>
                <img src={bandjam} style={{ width: 500, maxHeight: 500 }} />
              </div>
            

    </div>
   );
 };

export default About

