import React, { useState } from "react";

import BandCard from "../components/Cards/BandCard";
import { Row, Col, Container, Badge, NavLink } from "reactstrap";

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
      <Row>
        <Col sm={{ size: "auto", offset: 1 }}>
          <Container>
            <nav>
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
          </Container>
        </Col>
        <Col sm={{ size: "auto", offset: 1 }}>
          <Row>
            <Badge color="dark">Rock</Badge>
            <Badge color="dark">The Beatles</Badge>
            <Badge color="dark">Band Manager</Badge>
          </Row>
          <Row>
            <Badge color="dark">San Francisco</Badge>
            <button>Account settings</button>
          </Row>
          <Row>
            <h1>Bands</h1>
            <button>plus</button>
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
