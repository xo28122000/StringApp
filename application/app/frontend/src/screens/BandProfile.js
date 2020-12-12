import React, { useState, useEffect } from "react";

import {
  Button,
  Badge,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faMusic
} from "@fortawesome/free-solid-svg-icons";

import EventCard from "../components/Cards/EventCard";

import BandLogo from "../assets/BandLogo.png";
import user1 from "../assets/bandProfile/user1.jpg";
import user2 from "../assets/bandProfile/user2.jpg";
import user3 from "../assets/bandProfile/user3.jpg";
import bandPostImage from "../assets/bandProfile/bandPost.jpg";

import { useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const BandProfilePage = props => {
  const location = useLocation();
  const { bandName } = useParams();
  const history = useHistory();
  const userObj = useSelector(store => store.userObj);
  const [band, setBand] = useState(null);
  const [bandMembers, setBandMembers] = useState(null);
  const [musicRep, setMusicRep] = useState(null);
  useEffect(() => {
    if (!bandName) {
      history.goBack();
    } else {
      // todo: axios call to get the band
      setBand({
        bandId: "someid",
        name: "band name",
        numMembers: 2,
        logoImageUrl: "urlhere",
        location: {
          street: "some street",
          city: "San Francisco",
          state: "CA",
          country: "United States"
        },
        locationLat: 32432.423423,
        locationLong: 32432.423423,
        genre: "some genre",
        isLookingForMember: true,
        links: [{ key: "some key", link: "www.key.com" }],
        description:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
      });
      try {
      } catch (err) {}
      console.log(userObj);
    }
  }, [bandName]);

  const isAdm = location.search === "?admBand";

  const [invitationModal, setInvitationModal] = useState(false);
  const toggleInvitationModal = () => setInvitationModal(!invitationModal);

  const [invitations, setInvitations] = useState([
    {
      name: "Guy Russell",
      message:
        "I am a bass guitarist! I have played for 3 months with a band called ADBC. Please contact me at 8229918920. "
    },
    {
      name: "Dianne Hawkins",
      message: "I am a lead guitarist! My contact is 8229918920!"
    },
    {
      name: "Kristin Watson",
      message:
        "I am a band manager! I have managed 3 bands: QQP, Leads and Bandit-C. To get in tough email me at kwatson@abc.abc"
    }
  ]);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {band ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap-reverse",
              justifyContent: "center",
              padding: 40
            }}
          >
            <div style={{ width: "25%", minWidth: 300, marginTop: 20 }}>
              <div>
                <img
                  src={band.logoImageUrl}
                  style={{ width: 300, maxHeight: 300 }}
                />
              </div>
              <div
                className="divShadow"
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: 300,
                  padding: 20,
                  backgroundColor: "#ffffff"
                }}
              >
                {band.links.map(linkObj => (
                  <div>
                    <span style={{ fontWeight: 600 }}>{linkObj.key}:</span>{" "}
                    {linkObj.link}
                  </div>
                ))}
              </div>

              {isAdm ? (
                <div
                  className="divShadow"
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: 300,
                    padding: 20,
                    backgroundColor: "#ffffff"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start"
                    }}
                  >
                    Looking for new Members:
                    <Input
                      type="checkbox"
                      checked={true}
                      style={{
                        position: "relative",
                        margin: 0,
                        marginLeft: 10
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Button
                      onClick={() => toggleInvitationModal()}
                      style={{ backgroundColor: "#000000" }}
                    >
                      View invitations
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {band.isLookingForMember && (
                    <div
                      className="divShadow"
                      style={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        width: 300,
                        padding: 20,
                        backgroundColor: "#ffffff"
                      }}
                    >
                      <div style={{ marginBottom: 10 }}>
                        This band is looking for a new Member
                      </div>
                      <Button
                        style={{
                          backgroundColor: "#CB0086",
                          fontSize: 18,
                          paddingRight: 20,
                          paddingLeft: 20
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              style={{
                marginLeft: 40,
                marginRight: 40,
                fontSize: 18,
                width: "60%",
                minWidth: 300
              }}
            >
              <div style={{ fontSize: 45, fontWeight: 700 }}>{band.name}</div>
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
                <Badge
                  className="divShadow"
                  style={{
                    margin: 10,
                    padding: 15,
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 13,
                    backgroundColor: "#FFE600",
                    color: "#000000"
                  }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 4 }} />3
                </Badge>
                <Badge
                  className="divShadow"
                  style={{
                    margin: 10,
                    padding: 15,
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 13,
                    backgroundColor: "#CB0086"
                  }}
                >
                  <FontAwesomeIcon icon={faMusic} style={{ marginRight: 4 }} />
                  {band.genre}
                </Badge>
                <Badge
                  className="divShadow"
                  style={{
                    margin: 10,
                    padding: 15,
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 13,
                    backgroundColor: "#FFFFFF",
                    color: "#8A8A8A"
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginRight: 4 }}
                  />
                  {band.location.city}
                </Badge>
              </div>
              <div
                className="divShadow"
                style={{
                  marginTop: 30,
                  padding: 20,
                  backgroundColor: "#ffffff"
                }}
              >
                <div style={{ fontSize: 35, fontWeight: 700 }}>Members</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap"
                  }}
                >
                  {bandMembers ? (
                    bandMembers.map(member => (
                      <div
                        key={member}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: 30
                        }}
                      >
                        <div
                          style={{
                            width: 130,
                            height: 130,
                            borderRadius: 130,
                            marginBottom: 10
                          }}
                        >
                          <img
                            src={member.img}
                            style={{
                              width: 130,
                              maxHeight: 130,
                              borderRadius: 130
                            }}
                          />
                        </div>

                        <Badge
                          style={{
                            padding: 10,
                            width: "100%",
                            backgroundColor: "#000000",
                            borderRadius: 20,
                            marginBottom: 10
                          }}
                        >
                          {member.name}
                        </Badge>

                        <Badge
                          style={{
                            padding: 10,
                            width: "100%",
                            backgroundColor: "#000000",
                            borderRadius: 20
                          }}
                        >
                          {member.role}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        height: 100,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center"
                      }}
                    >
                      <div>Could not fetch band members.</div>
                      <Button color="primary">Retry</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {band.description && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 40,
                marginBottom: 20
              }}
            >
              <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
                About
              </div>
              <div>{band.description}</div>
            </div>
          )}

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: 40,
              marginBottom: 20
            }}
          >
            <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
              Music Repertoir
            </div>
            <Container style={{ fontSize: 18, overflowX: "scroll" }}>
              <Row
                style={{
                  marginBottom: 30,
                  color: "#B7B7B7",
                  flexWrap: "nowrap"
                }}
              >
                <Col xs="1"></Col>
                <Col xs="6" style={{ minWidth: 180 }}>
                  Name
                </Col>
                <Col xs="3" style={{ textAlign: "center", minWidth: 150 }}>
                  Genre
                </Col>
                <Col xs="2" style={{ textAlign: "center", minWidth: 100 }}>
                  Duration
                </Col>
              </Row>
              {[
                {
                  name: "The Beatles - Hey Jude",
                  link: "www.eirshugfhyisjikao.com",
                  genre: "Rock",
                  duration: "2:06"
                },
                {
                  name: "The Beatles - Here Comes The Sun",
                  link: "www.eirshugfhyisjikao.com",
                  genre: "Rock",
                  duration: "5:26"
                },
                {
                  name: "The Beatles - Let It Be",
                  link: "www.eirshugfhyisjikao.com",
                  genre: "Rock",
                  duration: "4:37"
                },
                {
                  name: "The Beatles - Yesterday",
                  link: "www.eirshugfhyisjikao.com",
                  genre: "Rock",
                  duration: "4:37"
                }
              ].map((rep, i) => (
                <Row
                  key={i}
                  style={{
                    marginBottom: 30,
                    alignItems: "center",
                    flexWrap: "nowrap"
                  }}
                >
                  <Col xs="1">{i + 1}.</Col>
                  <Col xs="6" style={{ minWidth: 180 }}>
                    <div>{rep.name}</div>
                    <div style={{ fontSize: 13, color: "#CB0086" }}>
                      {rep.link}
                    </div>
                  </Col>
                  <Col xs="3" style={{ textAlign: "center", minWidth: 150 }}>
                    <Badge
                      style={{
                        backgroundColor: "#CB0086",
                        padding: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 20
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMusic}
                        style={{ marginRight: 5 }}
                      />
                      {rep.genre}
                    </Badge>
                  </Col>
                  <Col xs="2" style={{ textAlign: "center", minWidth: 100 }}>
                    {rep.duration}
                  </Col>
                </Row>
              ))}
            </Container>
          </div>
          <div style={{ padding: 40, paddingBottom: 0, marginBottom: 20 }}>
            <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
              Posts
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                overflowX: "scroll",
                paddingBottom: 10
              }}
            >
              {[1, 2, 3, 4, 4, 5, 5, 6].map((post, i) => (
                <div
                  key={i}
                  className="divShadow"
                  style={{
                    backgroundColor: "#ffffff",
                    marginRight: 20,
                    padding: 30,
                    width: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}
                  >
                    JAM Nov 18
                  </div>
                  <div
                    style={{
                      marginBottom: 20,
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      src={bandPostImage}
                      style={{ width: 200, maxHeight: 200 }}
                    />
                  </div>
                  <div style={{ fontSize: 15 }}>
                    lots of great fans out tonight, stay tuned to cop one of our
                    surprize package giveaways to win a hoodie, backstage passes
                    and more!
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 40, paddingBottom: 100 }}>
            <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
              Events
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                overflowX: "scroll",
                paddingBottom: 10
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((event, i) => (
                <div>
                  <EventCard
                    title="LowKey Sessions"
                    description="We are planning a lowkey event to happen this Wednesday and would for you to join us! We will be playing some of our famous tracks and then will be taking public requests!"
                    date="Sept 21 2020"
                    startTime="8:30 pm"
                    endTime="10:30 pm"
                    genre="mellow"
                    bandId="3423342344"
                    bandName="Beatles"
                    loc={{
                      street: "100 font blvd",
                      city: "San Francisco",
                      state: "California",
                      zip: "94132"
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <Modal
            isOpen={invitationModal}
            toggle={toggleInvitationModal}
            backdrop="static"
          >
            <ModalHeader toggle={toggleInvitationModal}>
              New Member Applications
            </ModalHeader>
            <ModalBody>
              <div style={{ fontWeight: 600, fontSize: 20 }}>Invitations:</div>
              <div style={{ color: "#666666" }}>
                Accepting an invitation will result in adding them in your band
                as a band member.
              </div>
              <div>
                {invitations.map(invitation => (
                  <div
                    className="divShadow"
                    style={{ margin: 20, padding: 20, borderRadius: 20 }}
                  >
                    <div style={{ fontWeight: 500 }}>{invitation.name}</div>
                    <div
                      style={{
                        marginLeft: 20,
                        marginTop: 15,
                        maxHeight: 150,
                        overflowY: "auto"
                      }}
                    >
                      {invitation.message}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginTop: 20
                      }}
                    >
                      <Button
                        style={{ marginRight: 15, backgroundColor: "#000000" }}
                      >
                        Accept
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#f11313",
                          borderColor: "#f88989"
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner color="dark" style={{ width: "100px", height: "100px" }} />
        </div>
      )}
    </div>
  );
};

export default BandProfilePage;
