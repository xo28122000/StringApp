import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { withRouter } from "react-router";

const BandCard = props => {
  const goToBandPage = () => {
    props.history.push("/band?" + props.name);
  };

  return (
    <div style={{ margin: 25 }}>
      <Card
        className="divShadow"
        style={{
          borderRadius: 0,
          borderWidth: 0
        }}
        onClick={() => {
          goToBandPage();
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "#dfdfdf",
            borderBottomWidth: 1,
            borderBottomStyle: "solid"
          }}
        >
          <CardImg
            top
            style={{ width: 300, height: "auto", maxHeight: 300 }}
            src={props.imgUrl}
          />
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 20 }}>{props.name}</div>

          <div style={{ marginTop: 5 }}>
            <Badge
              style={{
                backgroundColor: "#CB0086",
                padding: 6,
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 15,
                fontWeight: 400
              }}
              pill
            >
              {props.genre}
            </Badge>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 15,
              fontWeight: 400,
              color: "#ABABAB",
              marginTop: 15
            }}
          >
            <div>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginRight: 4 }}
              />
              {props.loc.city}
            </div>
            <div>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: 4 }} />
              {props.numOfMembers}
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            goToBandPage();
          }}
          style={{
            padding: 10,
            backgroundColor: "#000000",
            borderRadius: 0,
            fontSize: 15,
            fontWeight: 400
          }}
        >
          More
        </Button>
      </Card>
    </div>
  );
};

export default withRouter(BandCard);
