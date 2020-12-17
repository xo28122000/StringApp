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
      title: "Housewarming and Big Band Jam Session!",
      description:
        "Come help us break in our new house, and bring your instruments/talents! Big Band/Swing jam session.",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "rock",
      bandId: "3423342344",
      bandName: "band6",
      loc: {
        street: "150 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    },
    {
      title: "Tuck and Patti Annual Thanksgiving Show",
      description:
        "For 41 years this unique, genre-crossing vocal/guitar jazz duo has cast its passionate musical spell worldwide, capturing the hearts of lovers, the respect of jazz buffs and the jaw-dropping awe of guitarists and singers.",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "4854",
      bandName: "band6",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }
    },
    {
      title: "TASTE (Hip Hop-Afro-Latin Remix)",
      description:
        "TASTE is a monthly dance party for the dance community happening in Oakland, inside Luka's side-room (lounge). An Afro-Latin Fusion of international music is here! With special surprise host and guest DJs mixing everything from Hip Hop/ R&B, Dancehall, Afrobeat and Reggaetón to Cumbia to Salsa. Come leave the floor on fire with us!",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "hip hop",
      bandId: "97347923",
      bandName: "band6",
      loc: {
        street: "San Diego Ave",
        city: "San Francisco",
        state: "California",
        zip: "94014"
      }
    },
    {
      title: "Salsa by the Bay",
      description:
        "Among his many accomplishments as a prominent DJ,Mix radio DJ, Promoter Tony O has been the face of Company's such as Marlboro Music presents, The SFjazz company,Liz Claiborne Cosmetic, Macy's and got sponsorships by dj company's through out the years.Tony O have DJ to sold-out crowds at the Bill Graham Civic Auditorium, the Cow Palace, The San Jose event center, the Hp Center and among others.",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "3468326",
      bandName: "band6",
      loc: {
        street: "Wawona street",
        city: "San Francisco",
        state: "California",
        zip: "94127"
      }
    },
    {
      title: "Folk Music Open Mic & Song Circle",
      description:
        "In the center of the city, on the edge of the neighborhood: “a San Francisco kind of Jesus joint.” St Cyprian’s is a congregation emboldened by the opportunity to engage with our energized urban neighborhood to create a community where everyone matters.",
      date: "Sept 21 2020",
      startTime: "12:30 pm",
      endTime: "1:30 pm",
      genre: "mellow",
      bandId: "432947",
      bandName: "band6",
      loc: {
        street: "Freemont street",
        city: "San Francisco",
        state: "California",
        zip: "94105"
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
                flexWrap: "wrap",
                minHeight: 300
              }}
            >
              {bands.length > 0 ? (
                bands.map(band => (
                  <BandCard key={band.name} {...band} loc={band.location} />
                ))
              ) : (
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  Cannot get any Bands that match your seach...
                </div>
              )}
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
