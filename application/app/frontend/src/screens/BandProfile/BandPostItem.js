import React from "react";
import bandPostImage from "../../assets/bandProfile/bandPost.jpg";
import { Card } from "reactstrap";
const BandPostItem = props => {
  return (
    <div style={{ margin: 25 }}>
      <Card
        className="divShadow"
        style={{
          backgroundColor: "#ffffff",
          width: 250,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          borderWidth: 0
        }}
      >
        <div
          style={{
            maxHeight: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <img src={bandPostImage} style={{ width: 250, maxHeight: 250 }} />
        </div>
        <div style={{ padding: 30, paddingTop: 10 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 20
            }}
          >
            {props.title}
          </div>

          <div style={{ fontSize: 15, maxHeight: 80, overflowY: "auto" }}>
            {props.description}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BandPostItem;
