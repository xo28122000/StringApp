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
          <span style={{ fontSize: 45, fontWeight: 600 }}>Contact Us</span>
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
        <div style={{ fontSize: 30, fontWeight: 600 }}>Corporate office</div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          8668 Concord Center Dr.
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Englewood, CO 80112
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>Direct Contact</div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          Phone: 720.974.7878
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          Toll Free: 1.877.929.7878
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Email: info@String.com
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>Departments</div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          customerservice@String.com
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
          }}
        >
          sales@String.com
        </div>
        <div
          style={{
            marginRight: 20,
            maxWidth: 500,
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          disputes@String.com
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
