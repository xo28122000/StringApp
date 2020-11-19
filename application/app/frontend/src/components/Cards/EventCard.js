import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { withRouter } from "react-router";
import { Link, Redirect } from "react-router-dom";

const EventCard = props => {
  const [eventModal, setEventModal] = useState(false);

  const toggleEventModal = () => {
    setEventModal(!eventModal);
  };

  return (
    <div style={{ margin: 25 }}>
      <Card
        className="divShadow"
        style={{
          borderRadius: 0,
          borderWidth: 0,
          width: 300
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            textAlign: "center",
            marginTop: 10
          }}
        >
          {props.title}
        </div>
        <div
          style={{
            fontSize: 15,
            textAlign: "center"
          }}
        >
          <Link to={"/band?" + props.bandName} target="_blank">
            {props.bandName}
          </Link>
        </div>
        <div style={{ padding: 10 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: "#ABABAB"
            }}
          >
            {props.date}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 15,
              fontWeight: 400,
              color: "#ABABAB"
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
          </div>
        </div>
        <Button
          onClick={() => {
            toggleEventModal();
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

      {/*
       */}

      <Modal isOpen={eventModal} toggle={toggleEventModal}>
        <ModalHeader
          toggle={toggleEventModal}
          style={{
            fontSize: 20,
            fontWeight: 500
          }}
        >
          {props.title}
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              fontSize: 15,
              fontWeight: 400
              //   color: "#ABABAB"
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 600 }}>Posted by:</span>{" "}
              <Link to={"/band?" + props.bandName} target="_blank">
                {props.bandName}
              </Link>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 600 }}>When:</span> {props.date} from{" "}
              {props.startTime} to {props.endTime}
            </div>

            <div>
              <span style={{ fontWeight: 600 }}>Where:</span>{" "}
              <a
                href={
                  "https://maps.google.com/?q=" +
                  props.loc.street +
                  ", " +
                  props.loc.city +
                  ", " +
                  props.loc.state +
                  ", " +
                  props.loc.zip
                }
                target="_blank"
              >
                {props.loc.street}; {props.loc.city}
              </a>
            </div>
            <div
              style={{
                margin: 20,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "#e9e9e9"
              }}
            >
              {props.description}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(EventCard);
