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
  Spinner,
  Label,
  FormText
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faMusic
} from "@fortawesome/free-solid-svg-icons";

import EventCard from "../../components/Cards/EventCard";
import ReloadPage from "./ReloadPage";
import MusicRepItem from "./MusicRepItem";
import BandPostItem from "./BandPostItem";
import BandMemberItem from "./BandMemberItem";

import BandLogo from "../../assets/BandLogo.png";
import user1 from "../../assets/bandProfile/user1.jpg";
import user2 from "../../assets/bandProfile/user2.jpg";
import user3 from "../../assets/bandProfile/user3.jpg";
import bandPostImage from "../../assets/bandProfile/bandPost.jpg";

import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const axios = require("axios");

const BandProfilePage = props => {
  const { bandName } = useParams();
  const history = useHistory();
  const userObj = useSelector(store => store.userObj);
  const [band, setBand] = useState(null);
  const [bandMembers, setBandMembers] = useState(null);
  const [musicRep, setMusicRep] = useState(null);
  const [posts, setPosts] = useState(null);
  const [events, setEvents] = useState(null);
  useEffect(async () => {
    if (!bandName) {
      history.goBack();
    } else {
      // todo: axios call to get the band
      // setBand({
      //   bandId: "someid",
      //   name: "band name",
      //   numMembers: 2,
      //   logoImageUrl:
      //     "https://upload.wikimedia.org/wikipedia/commons/8/89/The_Band_%281969%29.png",
      //   location: {
      //     street: "some street",
      //     city: "San Francisco",
      //     state: "CA",
      //     country: "United States"
      //   },
      //   locationLat: 32432.423423,
      //   locationLong: 32432.423423,
      //   genre: "some genre",
      //   isLookingForMember: true,
      //   links: [{ key: "some key", link: "www.key.com" }],
      //   description:
      //     'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
      // });
      setBandMembers([
        {
          name: "John lenon",
          role: "Lead Guitarist",
          img:
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f09bdf7b-f817-4111-82f4-a4ff5545cbc4/d1108y8-e558a69c-da90-47f5-992d-c2ffd358f2fb.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjA5YmRmN2ItZjgxNy00MTExLTgyZjQtYTRmZjU1NDVjYmM0XC9kMTEwOHk4LWU1NThhNjljLWRhOTAtNDdmNS05OTJkLWMyZmZkMzU4ZjJmYi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lbpb6aNH1rLygd5UoJKG4pboQrq1VYidpxVJp8yQEuc"
        }
      ]);
      setMusicRep([
        {
          name: "The Beatles - Hey Jude",
          link: "www.eirshugfhyisjikao.com",
          genre: "Rock",
          duration: "2:06"
        },
        {
          name: "The Beatles - Hey Jude",
          link: "www.eirshugfhyisjikao.com",
          genre: "Rock",
          duration: "2:06"
        },
        {
          name: "The Beatles - Hey Jude",
          link: "www.eirshugfhyisjikao.com",
          genre: "Rock",
          duration: "2:06"
        }
      ]);
      setPosts([
        {
          bandPostId: 2112,
          media: "www.eirshugfhyisjikao.com",
          title: "some band title",
          description: "some band long long description"
        }
      ]);
      setEvents([
        {
          title: "LowKey Sessions",
          description:
            "We are planning a lowkey event to happen this Wednesday and would for you to join us! We will be playing some of our famous tracks and then will be taking public requests!",
          date: "Sept 21 2020",
          startTime: "8:30 pm",
          endTime: "10:30 pm",
          genre: "mellow",
          bandId: "3423342344",
          bandName: "Beatles",
          loc: {
            street: "100 font blvd",
            city: "San Francisco",
            state: "California",
            zip: "94132"
          }
        }
      ]);
      try {
        let res = await axios.post("/api/band/getBandFromName", {
          name: bandName
        });
        if (res.data.success) {
          setBand(res.data.band);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [bandName]);
  
  useEffect(() => {
    const getAll = async () => {
      if (band) {
        try {
          let res;

          res = await axios.post("/api/band/getBandMembers", {
            bandId: band.bandId
          });
          setBandMembers(res.data.bandMembers);
          // setBandMembers
        } catch (err) {
          console.log(err);
        }
      }
    };
    getAll();
    //
  }, [band]);

  const isBandAdmin = () => {
    return false;
  };
  const isBandMember = () => {
    return true;
  };

  const [invitationModal, setInvitationModal] = useState(false);

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

  const [sendInviteModal, setSendInviteModal] = useState(false);
  const [addLinkModal, setAddLinkModal] = useState(false);
  const [deleteLinkModal, setDeleteLinkModal] = useState(false);
  const [deleteLink, setDeleteLink] = useState(null);
  const [editBandModal, setEditBandModal] = useState(false);
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(null);

  const [addRepModal, setAddRepModal] = useState(null);
  const [addPostModal, setAddPostModal] = useState(null);
  const [addEventModal, setAddEventModal] = useState(null);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
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
                  alignItems: "stretch",
                  width: 300,
                  padding: 20,
                  backgroundColor: "#ffffff"
                }}
              >
                {band.links.map(linkObj => (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div style={{ fontWeight: 600, marginRight: 5 }}>
                        {linkObj.key}:
                      </div>
                      <div>{linkObj.link}</div>
                      {isBandMember() && (
                        <Button
                          onClick={() => {
                            setDeleteLink(linkObj);
                            setDeleteLinkModal(true);
                          }}
                          color="danger"
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          x
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {isBandMember() && (
                  <Button
                    onClick={() => {
                      setAddLinkModal(true);
                    }}
                    color="primary"
                    style={{ marginTop: 10, width: "100%" }}
                  >
                    Add Link
                  </Button>
                )}
              </div>

              {isBandAdmin() ? (
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
                      onClick={() => {
                        setInvitationModal(!invitationModal);
                      }}
                      style={{ backgroundColor: "#000000" }}
                    >
                      View invitations
                    </Button>
                  </div>
                </div>
              ) : (
                !isBandMember() && (
                  <>
                    {userObj && band.isLookingForMember && (
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
                          onClick={() => {
                            setSendInviteModal(true);
                          }}
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
                )
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

              {/* 
                ***
                ***
                    Band members
                ***
                ***
              */}

              <div
                className="divShadow"
                style={{
                  marginTop: 30,
                  padding: 20,
                  paddingBottom: 30,
                  backgroundColor: "#ffffff"
                }}
              >
                <div style={{ fontSize: 35, fontWeight: 700 }}>Members</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    maxHeight: 400,
                    overflowY: "auto"
                  }}
                >
                  {bandMembers ? (
                    bandMembers.map((member, i) => (
                      <BandMemberItem key={i} {...member} />
                    ))
                  ) : (
                    <ReloadPage value="band members" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 
          ***
          ***
              Band Description
          ***
          ***
          */}

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

          {/* 
          ***
          ***
              REP LIST
          ***
          ***
          */}

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: 40,
              marginBottom: 20
            }}
          >
            <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
              Music Repertoir{" "}
              {isBandMember() && (
                <Button
                  onClick={() => {
                    setAddRepModal(true);
                  }}
                  color="primary"
                  style={{ marginLeft: 30 }}
                >
                  Add New Repertoir
                </Button>
              )}
            </div>
            {musicRep ? (
              <Container
                style={{
                  fontSize: 18,
                  overflowX: "auto",
                  maxHeight: 350,
                  overflowY: "auto",
                  padding: 40
                }}
              >
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

                {musicRep.map((rep, i) => (
                  <MusicRepItem
                    {...rep}
                    key={i}
                    index={i}
                    isBandMember={isBandMember()}
                  />
                ))}
              </Container>
            ) : (
              <ReloadPage value="music rep list" />
            )}
          </div>

          {/* 
          ***
          ***
              BAND POSTS
          ***
          ***
          */}

          <div
            style={{
              padding: 40,
              marginBottom: 20,
              backgroundColor: "#ffffff"
            }}
          >
            <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
              Posts{" "}
              {isBandMember() && (
                <Button
                  onClick={() => {
                    setAddPostModal(true);
                  }}
                  color="primary"
                  style={{ marginLeft: 30 }}
                >
                  Add New Post
                </Button>
              )}
            </div>

            {posts ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  overflowX: "auto",
                  paddingBottom: 10
                }}
              >
                {posts.map((post, i) => (
                  <BandPostItem
                    key={i}
                    {...post}
                    isBandMember={isBandMember()}
                  />
                ))}
              </div>
            ) : (
              <ReloadPage value="Band Posts" />
            )}
          </div>

          {/* 
          ***
          ***
              EVENTS
          ***
          ***
          */}

          <div
            style={{
              padding: 40,
              backgroundColor: "#ffffff"
            }}
          >
            <div style={{ fontSize: 35, fontWeight: 700, marginBottom: 20 }}>
              Events{" "}
              {isBandMember() && (
                <Button
                  onClick={() => {
                    setAddEventModal(true);
                  }}
                  color="primary"
                  style={{ marginLeft: 30 }}
                >
                  Add New Event
                </Button>
              )}
            </div>
            {events ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  overflowX: "auto",
                  paddingBottom: 10
                }}
              >
                {events.map((event, i) => (
                  <div key={i}>
                    {isBandMember() && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: -20,
                          marginRight: 25
                        }}
                      >
                        <Button
                          color="danger"
                          onClick={() => {
                            setDeleteEvent(event);
                            setDeleteEventModal(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                    <EventCard {...event} />
                  </div>
                ))}
              </div>
            ) : (
              <ReloadPage value="band events" />
            )}
          </div>

          {isBandMember() && (
            <div
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                padding: 20,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.8)"
              }}
            >
              <Button
                onClick={() => {
                  setEditBandModal(true);
                }}
                color="primary"
                style={{ fontSize: 18 }}
              >
                Edit Band Info
              </Button>
            </div>
          )}

          {/* 
          ***
          ***
              MODALS
          ***
          ***
          */}

          <Modal
            isOpen={sendInviteModal}
            toggle={() => setSendInviteModal(!sendInviteModal)}
            backdrop="static"
          >
            <ModalHeader toggle={() => setSendInviteModal(!sendInviteModal)}>
              Send Invitation to join this band
            </ModalHeader>
            <ModalBody>
              {false ? (
                <></>
              ) : (
                <div>
                  <span style={{ fontWeight: "600", fontSize: 17 }}>
                    Type a descriptive message for the band admin.
                  </span>
                  <br />
                  You may want to include your previous experiences, your
                  current location and contact information
                  <Input
                    type="textarea"
                    style={{ marginTop: 10, minHeight: 200 }}
                  />
                  <FormText color="muted">Max 250 words</FormText>
                  <Button
                    color="success"
                    style={{ float: "right", marginTop: 10 }}
                  >
                    Send
                  </Button>
                </div>
              )}
            </ModalBody>
          </Modal>

          <Modal
            isOpen={addLinkModal}
            toggle={() => setAddLinkModal(!addLinkModal)}
            backdrop="static"
          >
            <ModalHeader toggle={() => setAddLinkModal(!addLinkModal)}>
              Add link to your band
            </ModalHeader>
            <ModalBody>
              <div style={{ display: "flex" }}>
                <Input
                  placeholder="key. Ex: youtube"
                  style={{ marginTop: 10 }}
                />
                :
                <Input
                  placeholder="Link. Ex: www.youtube.com/"
                  style={{ marginTop: 10 }}
                />
              </div>

              <Button color="success" style={{ float: "right", marginTop: 10 }}>
                Add Link
              </Button>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={deleteLinkModal}
            toggle={() => setDeleteLinkModal(!deleteLinkModal)}
            backdrop="static"
          >
            <ModalBody
              style={{
                textAlign: "center",
                paddingTop: 40,
                paddingBottom: 40,
                fontSize: 18,
                fontWeight: 600
              }}
            >
              Are you sure you want to delete "{deleteLink && deleteLink.key}"
              link?
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  onClick={() => {
                    setDeleteLinkModal(!deleteLinkModal);
                  }}
                  color="dark"
                >
                  Cancel
                </Button>
                <Button color="danger">Delete Link</Button>
              </div>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={invitationModal}
            toggle={() => {
              setInvitationModal(!invitationModal);
            }}
            backdrop="static"
          >
            <ModalHeader
              toggle={() => {
                setInvitationModal(!invitationModal);
              }}
            >
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

          <Modal
            isOpen={deleteEventModal}
            toggle={() => setDeleteEventModal(!deleteEventModal)}
            backdrop="static"
          >
            <ModalBody
              style={{
                textAlign: "center",
                paddingTop: 40,
                paddingBottom: 40,
                fontSize: 18,
                fontWeight: 600
              }}
            >
              Are you sure you want to delete "
              {deleteEvent && deleteEvent.title}" event?
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  onClick={() => {
                    setDeleteEventModal(!deleteEventModal);
                  }}
                  color="dark"
                >
                  Cancel
                </Button>
                <Button color="danger">Delete Event</Button>
              </div>
            </ModalBody>
          </Modal>

          {/* add modals */}

          <Modal
            isOpen={addRepModal}
            toggle={() => {
              setAddRepModal(!addRepModal);
            }}
            backdrop="static"
          >
            <ModalHeader
              toggle={() => {
                setAddRepModal(!addRepModal);
              }}
            >
              Add new Repertoir to your band
            </ModalHeader>
            <ModalBody>
              <Input
                id="addRepName"
                style={{ marginBottom: 20 }}
                placeholder="Name of this Repertoir"
              />
              <Input
                id="addRepLink"
                style={{ marginBottom: 20 }}
                placeholder="Link to this Repertoir. (ex: https://code-404.xyz/)"
              />
              <Input
                id="addRepGenre"
                style={{ marginBottom: 20 }}
                placeholder="Genre of this Repertoir"
              />
              Duration of this Repertoir
              <div
                style={{
                  display: "flex",
                  marginBottom: 20,
                  marginLeft: 50,
                  alignItems: "center",
                  fontSize: 20,
                  fontWeight: 600
                }}
              >
                <Input
                  id="addRepDurationMin"
                  style={{ marginRight: 5 }}
                  placeholder="minutes"
                  type="number"
                  min={0}
                />
                {" : "}
                <Input
                  id="addRepDurationSec"
                  style={{ marginLeft: 5 }}
                  placeholder="seconds"
                  type="number"
                  min={0}
                  max={60}
                />
              </div>
              <Button onclick={() => {}} color="primary">
                Add Repertoir
              </Button>
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
