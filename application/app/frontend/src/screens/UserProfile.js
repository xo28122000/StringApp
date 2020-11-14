import React, { useState } from "react";

import BandCard from "../components/Cards/BandCard";
import { Row, Col, Container, Badge, NavLink, Card, Button } from "reactstrap";
import { scroller } from "react-scroll";

const UserProfileScreen = () => {
  const [bands, setBands] = useState([
    {
      name: "band1",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132",
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
  ]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          width: "70vw",
          maxWidth: 800,
          minWidth: 300,
          backgroundColor: "#000000",
        }}
      >
        <div
          style={{
            marginRight: 0,
            maxWidth: 800,
            fontSize: 50,
            color: "white",
          }}
        >
          John Lennon
        </div>
      </div>
      <Row>
        <Col sm={{ size: "auto", offset: 0 }}>
          <img src="../logo512.png" />
          <Card
            body
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <nav
              style={{
                fontSize: 20,
                fontWeight: 500,
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <div>
                Instagram:<NavLink>http</NavLink>
              </div>
              <div>
                Twitter:<NavLink>http</NavLink>
              </div>
              <div>
                Youtube:<NavLink>http</NavLink>
              </div>
              <div>
                Spotify:<NavLink>http</NavLink>
              </div>
              <div>
                Apple music:<NavLink>http</NavLink>
              </div>
            </nav>
          </Card>
        </Col>
        <Col sm={{ size: "auto", offset: 0 }}>
          <Row
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Badge color="dark" pill>
              Rock
            </Badge>
            <Badge color="dark" pill>
              The Beatles
            </Badge>
            <Badge color="dark" pill>
              Band Manager
            </Badge>
          </Row>
          <Row
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Badge color="dark">San Francisco</Badge>
            <button>Account settings</button>
          </Row>
          <Row
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h1>Bands</h1>
            <button>Add</button>
          </Row>
          <div>
            <div
              style={{
                marginTop: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {bands.map((band) => (
                <BandCard key={band.name} {...band} />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileScreen;
