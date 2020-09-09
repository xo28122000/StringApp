import React from "react";
import Navbar from "../components/Navbar";

const ProfileScreen = props => {
  console.log(props);
  return (
    <div>
      <Navbar img={false} textColor={"#000000"} />
      this profile page
    </div>
  );
};

export default ProfileScreen;
