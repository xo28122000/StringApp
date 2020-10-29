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

const BandCard = props => {
  return (
    <div style={{ margin: 10 }}>
      <Card style={{ width: 200 }}>
        <CardImg
          top
          style={{ width: 200, height: "auto", maxHeight: 200 }}
          src={props.imgUrl}
        />
        <CardBody>
          <CardTitle style={{ fontWeight: 600, fontSize: 20 }}>
            {props.name}
          </CardTitle>

          <div>
            <Badge color="dark" pill>
              Type of music: {props.type}
            </Badge>
          </div>
          <div>
            <Badge color="dark" pill>
              Number of members: {props.numMembers}
            </Badge>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BandCard;
