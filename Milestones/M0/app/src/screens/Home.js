import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
const HomeScreen = () => {
  return (
    <div style={{ backgroundColor: "#000000", height: "100vh" }}>
      <Navbar img={true} textColor={"#FFFFFF"} />
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        M0
      </div>
    </div>
  );
};

export default HomeScreen;
