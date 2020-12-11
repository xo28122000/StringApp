import React from "react";
import saxophoneplay from "../assets/saxophoneplay.svg";
import bro from "../assets/bro.svg";
import bandjam from "../assets/bandjam.svg";

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

export default About;
