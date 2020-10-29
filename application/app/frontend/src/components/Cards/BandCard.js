import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
} from "reactstrap";

const BandCard = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="/assets/Band.png" alt="Card image cap" />
        <CardBody>
          <CardTitle>The Beatles</CardTitle>
          <CardSubtitle>
            <Badge color="dark" pill>
              Rock
            </Badge>
          </CardSubtitle>
          <CardText>Location: San Francisco</CardText>
          <Button>MORE</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default BandCard;
