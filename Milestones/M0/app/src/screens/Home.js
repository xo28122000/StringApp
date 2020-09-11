import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const HomeScreen = () => {
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0);
  const [isInc, setIsInc] = useState(true);
  const textLoop = () => {};

  const store = "ilestone";

  useEffect(() => {
    const timeout = setInterval(async () => {
      if (isInc) {
        setText(text.concat(store[counter]));
        setCounter(counter + 1);
      } else {
        setText(text.substring(0, text.length - 1));
        setCounter(counter - 1);
      }

      if (counter >= store.length - 1) {
        setIsInc(false);
      }
      if (counter <= 1) {
        setIsInc(true);
      }
    }, 0.3 * 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [counter, text, isInc]);

  return (
    <div style={{ backgroundColor: "#000000", height: "100vh" }}>
      <Navbar img={true} textColor={"#FFFFFF"} />
      <div
        className="home-text"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        M<span className="home-subtext ">{text}</span> 0
      </div>
    </div>
  );
};

export default HomeScreen;
