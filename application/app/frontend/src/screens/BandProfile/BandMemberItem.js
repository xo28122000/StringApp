import React from "react";
import { Badge, Card } from "reactstrap";
import defaultProfileImage from "../../assets/defaultProfile.jpeg";

const BandMemberItem = props => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 25
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: 130,
          marginBottom: 10
        }}
      >
        {props.img ? (
          <img
            src={props.profileImageUrl}
            style={{
              width: 130,
              maxHeight: 130,
              borderRadius: 130
            }}
          />
        ) : (
          <img
            src={defaultProfileImage}
            style={{
              width: 130,
              maxHeight: 130,
              borderRadius: 130
            }}
          />
        )}
      </div>

      <Badge
        style={{
          padding: 10,
          width: "100%",
          backgroundColor: "#000000",
          borderRadius: 20,
          marginBottom: 10
        }}
      >
        {props.name}
      </Badge>

      <Badge
        style={{
          padding: 10,
          width: "100%",
          backgroundColor: "#000000",
          borderRadius: 20
        }}
      >
        {props.role}
      </Badge>
    </Card>
  );
};

export default BandMemberItem;
