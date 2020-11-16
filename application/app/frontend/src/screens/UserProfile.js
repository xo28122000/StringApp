import React, { useState } from "react";

import BandCard from "../components/Cards/BandCard";
import { Row, Col, Container, Badge, NavLink, Card, Button } from "reactstrap";
import { scroller } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faMusic,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

const UserProfileScreen = () => {
  const [bands, setBands] = useState([
    {
      name: "band1",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    },
    {
      name: "band1",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    },
    {
      name: "band1",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    }
  ]);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",

          padding: 50,
          paddingRight: 20,
          paddingLeft: 20,

          fontSize: 45,
          fontWeight: 700,
          color: "#ffffff"
        }}
      >
        John Lennon
      </div>
      <Row style={{ margin: 0 }}>
        <Col
          lg={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div>
            <img style={{ height: 200 }} src="../logo512.png" />
          </div>
          <div
            className="divShadow"
            style={{
              marginTop: 10,
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "#ffffff"
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                paddingLeft: 40,
                paddingRight: 40
              }}
            >
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Instagram:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Twitter:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Youtube:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Spotify:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Apple music:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Row
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: 20,
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Badge
              className="divShadow"
              style={{
                margin: 10,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                color: "#FFFFFF",
                backgroundColor: "#CB0086",
                borderRadius: 20
              }}
            >
              <FontAwesomeIcon icon={faMusic} style={{ marginRight: 4 }} />
              Rock
            </Badge>

            <Badge
              className="divShadow"
              style={{
                margin: 10,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                color: "#0B0B0B",
                backgroundColor: "#FF9900"
              }}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: 4 }} />
              Band Manager
            </Badge>
            <Badge
              className="divShadow"
              style={{
                margin: 10,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                color: "#8A8A8A",
                backgroundColor: "#FFFFFF"
              }}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginRight: 4 }}
              />
              San Francisco
            </Badge>
          </Row>

          <div
            style={{
              marginTop: 50,
              display: "flex",
              alignItems: "center",
              paddingRight: 20,
              paddingLeft: 20
            }}
          >
            <span style={{ fontSize: 35, fontWeight: 600, marginRight: 10 }}>
              Bands
            </span>
            <Button
              style={{
                backgroundColor: "#000000",
                borderRadius: 25,
                height: 50,
                width: 50
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />
            </Button>
          </div>
          <div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              {bands.map(band => (
                <BandCard key={band.name} {...band} />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfileScreen;
