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
import EventSearchBar from "../components/Searchbar/EventSearchBar";
import BandCard from "../components/Cards/BandCard";
import EventCard from "../components/Cards/EventCard";
import { scroller, Element } from "react-scroll";
import Axios from "axios";

const ExplorePage = props => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [bands, setBands] = useState([]);

  const [events, setEvents] = useState([
    {
      title: "event title",
      description: "some description about the event...",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "3423342344",
      bandName: "band6",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    },
    {
      title: "event title 2",
      description: "some description about the event...",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "3423342344",
      bandName: "band6",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    },
    {
      title: "event title 3",
      description: "some description about the event...",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "3423342344",
      bandName: "band6",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    },
    {
      title: "event title 4",
      description: "some description about the event...",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "3423342344",
      bandName: "band6",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    },
    {
      title: "event title 5",
      description: "some description about the event...",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "3423342344",
      bandName: "band6",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState("1");

  React.useEffect(() => {
    Axios.post("/api/band/searchBands")
      .then(res => {
        if (res.data.success) {
          setBands(res.data.result);
        }
      })
      .catch(err => {});
  }, []);

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
            {screenWidth > 600 ? (
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
                    scroller.scrollTo("exploreJump", {
                      duration: 1000,
                      delay: 50,
                      smooth: true
                    });
                  }}
                >
                  Start Exploring
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <Element name="exploreJump"></Element>
        <a id="explore" />
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
                <BandCard key={band.name} {...band} loc={band.location} />
              ))}
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div>
              <EventSearchBar />
              <div
                style={{
                  marginTop: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                {events.map(event => (
                  <EventCard key={event.title} {...event} />
                ))}
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default ExplorePage;
