import React, { useState } from "react";

const ContactPage = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
  }, []);

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "#141414",
            padding: 0,
            paddingTop: 50,
            paddingBottom: 0,
            color: "#ffffff",
          }}
        >
          <span style={{ fontSize: 45, fontWeight: 600 }}>
            Frequently Asked Questions
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 30,
              width: "70vw",
              maxWidth: 800,
              minWidth: 300,
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: 40,
          paddingTop: 40,
          paddingBottom: 120,
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 600 }}>- I can't sign up</div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          Please email us with the detailed
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          description of the issue you are having on
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          customerservice@String.com
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - I can't join the band
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          Please email us with the detailed
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          description of the issue you are having on
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          customerservice@String.com
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - My cat doesn't use litter box
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          Please email us with the detailed
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          description of the issue you are having on
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          customerservice@String.com
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
