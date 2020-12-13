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
          alignItems: "left",
          textAlign: "left",
          padding: 40,
          paddingTop: 40,
          paddingBottom: 120,
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 600 }}>- I can't sign up?</div>

        <div
          style={{
            marginRight: 20,

            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Please email us with the detailed description of the issue you are
          having on customerservice@String.com
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - I can't join the band?
        </div>
        <div
          style={{
            marginRight: 20,

            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Try to scroll down the band profile page and look for the apply
          button. If you are can't find it then band is not currently looking
          for anybody to invite.
        </div>

        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - I can't create a band?
        </div>
        <div
          style={{
            marginRight: 20,

            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          If you are to go to your profile page there will be a button next to
          the bands you are already participating at. Click it and you will be
          able to start band creationg.
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - Can I create a band that has already existing name outside of the
          String platform?
        </div>
        <div
          style={{
            marginRight: 20,

            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Please refer to our Terms and Conditions.
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - If i find inapropriate content how do i report it?
        </div>
        <div
          style={{
            marginRight: 20,

            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Please email us at customerservice@String.com
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>
          - How do I change Band profile picture?
        </div>
        <div
          style={{
            marginRight: 20,

            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          If you go to your band's profile page , right under your profile
          picture you can find a button to upload new profile picture.
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
