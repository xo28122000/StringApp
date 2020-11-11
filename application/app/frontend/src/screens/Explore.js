import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  Jumbotron
} from "reactstrap";

import BandSearchBar from "../components/Searchbar/BandSearchBar";
import BandCard from "../components/Cards/BandCard";
import { scroller, Element } from "react-scroll";

const ExplorePage = props => {
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
      name: "band2",
      genre: "accoustic",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 3,
      imgUrl:
        "data:image/jpeg;base64,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"
    },
    {
      name: "band3",
      genre: "mellow",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 1,
      imgUrl:
        "data:image/jpeg;base64,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"
    },
    {
      name: "band4",
      genre: "rnb",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 4,
      imgUrl:
        "data:image/jpeg;base64,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"
    }
  ]);

  const [activeTab, setActiveTab] = useState("1");

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
            padding: 40,
            paddingTop: 70,
            paddingBottom: 70,
            color: "#ffffff"
          }}
        >
          <span style={{ fontSize: 45, fontWeight: 600 }}>
            One stop for everything bands realted
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 30,
              width: "70vw",
              maxWidth: 800,
              minWidth: 300
            }}
          >
            <div style={{ marginRight: 20, maxWidth: 500, fontSize: 16 }}>
              Browse events near by with live music, showcase all your music and
              work with posts and press mentions to make people find you easily,
              connect with other musicians to work together!
            </div>
            <div style={{}}>
              <Button
                style={{
                  padding: 20,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: 20,
                  width: 200,
                  fontSize: 18
                }}
                onClick={() => {
                  scroller.scrollTo("explore", {
                    duration: 1000,
                    delay: 50,
                    smooth: true
                  });
                }}
              >
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Element name="explore"></Element>
        <Nav
          tabs
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <NavItem>
            <NavLink
              className={activeTab === "1" ? "active" : ""}
              onClick={() => {
                setActiveTab("1");
              }}
              style={{
                fontSize: 20,
                fontWeight: 500,
                paddingLeft: 40,
                paddingRight: 40,
                color: activeTab !== "1" ? "#7f7f7f" : "#000000",
                borderBottomStyle: "solid",
                borderBottomWidth: 3,
                borderBottomColor: activeTab === "1" ? "#000000" : ""
              }}
            >
              Explore Bands
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => {
                setActiveTab("2");
              }}
              style={{
                fontSize: 20,
                fontWeight: 500,
                paddingLeft: 40,
                paddingRight: 40,
                color: activeTab !== "2" ? "#7f7f7f" : "#000000",
                borderBottomStyle: "solid",
                borderBottomWidth: 3,
                borderBottomColor: activeTab === "2" ? "#000000" : ""
              }}
            >
              Explore Events
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div>
              <BandSearchBar setBands={setBands} />
            </div>
            <div
              style={{
                marginTop: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              {bands.map(band => (
                <BandCard key={band.name} {...band} />
              ))}
            </div>
          </TabPane>
          <TabPane tabId="2">there</TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default ExplorePage;
