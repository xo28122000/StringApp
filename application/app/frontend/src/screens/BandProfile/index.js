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
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
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

import { useParams, useHistory, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const axios = require("axios");
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}
const BandProfilePage = props => {
  const { bandName } = useParams();
  const history = useHistory();
  const userObj = useSelector(store => store.userObj);
  const [band, setBand] = useState(null);
  const [bandMembers, setBandMembers] = useState(null);
  const [musicRep, setMusicRep] = useState(null);
  const [posts, setPosts] = useState(null);
  const [events, setEvents] = useState(null);
  useEffect(() => {
    (async () => {
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
        // setBandMembers([
        //   {
        //     name: "John lenon",
        //     role: "Lead Guitarist",
        //     img:
        //       "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f09bdf7b-f817-4111-82f4-a4ff5545cbc4/d1108y8-e558a69c-da90-47f5-992d-c2ffd358f2fb.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjA5YmRmN2ItZjgxNy00MTExLTgyZjQtYTRmZjU1NDVjYmM0XC9kMTEwOHk4LWU1NThhNjljLWRhOTAtNDdmNS05OTJkLWMyZmZkMzU4ZjJmYi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lbpb6aNH1rLygd5UoJKG4pboQrq1VYidpxVJp8yQEuc"
        //   }
        // ]);
        // setMusicRep([
        //   {
        //     name: "The Beatles - Hey Jude",
        //     link: "www.eirshugfhyisjikao.com",
        //     genre: "Rock",
        //     duration: "2:06"
        //   },
        //   {
        //     name: "The Beatles - Hey Jude",
        //     link: "www.eirshugfhyisjikao.com",
        //     genre: "Rock",
        //     duration: "2:06"
        //   },
        //   {
        //     name: "The Beatles - Hey Jude",
        //     link: "www.eirshugfhyisjikao.com",
        //     genre: "Rock",
        //     duration: "2:06"
        //   }
        // ]);
        // setPosts([
        //   {
        //     bandPostId: 2112,
        //     media: "www.eirshugfhyisjikao.com",
        //     title: "some band title",
        //     description: "some band long long description"
        //   }
        // ]);
        // setEvents([
        //   {
        //     title: "LowKey Sessions",
        //     description:
        //       "We are planning a lowkey event to happen this Wednesday and would for you to join us! We will be playing some of our famous tracks and then will be taking public requests!",
        //     date: "Sept 21 2020",
        //     startTime: "8:30 pm",
        //     endTime: "10:30 pm",
        //     genre: "mellow",
        //     bandId: "3423342344",
        //     bandName: "Beatles",
        //     loc: {
        //       street: "100 font blvd",
        //       city: "San Francisco",
        //       state: "California",
        //       zip: "94132"
        //     }
        //   }
        // ]);
        try {
          let res = await axios.post("/api/band/getBandFromName", {
            name: bandName
          });
          if (res.data.success) {
            setBand(res.data.band);
            setGenre(res.data.band.genre);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [bandName]);

  useEffect(() => {
    (async () => {
      if (band) {
        try {
          let res;

          res = await axios.post("/api/band/getBandMembers", {
            bandId: band.bandId
          });
          if (res.data.success) {
            setBandMembers(res.data.bandMembers);
          }
          res = await axios.post("/api/band/getBandRep", {
            bandId: band.bandId
          });
          if (res.data.success) {
            setMusicRep(res.data.result);
          }
          res = await axios.post("/api/band/getBandPosts", {
            bandId: band.bandId
          });
          if (res.data.success) {
            setPosts(res.data.result);
          }
          res = await axios.post("/api/band/getEvents", {
            bandId: band.bandId
          });
          if (res.data.success) {
            console.log(res.data.result);
            setEvents(res.data.result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
    //
  }, [band]);

  useEffect(() => {
    if (bandMembers && userObj) {
      bandMembers.forEach(bandMember => {
        if (bandMember.userId === userObj.userId) {
          setIsBandMember(true);
          if (bandMember.isBandAdmin === 1) {
            setIsBandAdmin(true);
          }
        }
      });
    }
  }, [bandMembers, userObj]);

  // TODO: change to state variables
  const [isBandAdmin, setIsBandAdmin] = useState(false);
  const [isBandMember, setIsBandMember] = useState(false);

  const [invitationModal, setInvitationModal] = useState(false);

  useEffect(() => {
    if (invitationModal) {
      axios
        .post("/api/band/getInvites", { bandId: band.bandId })
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            setInvitations(res.data.result);
          }
        })
        .catch(err => {});
    }
  }, [invitationModal]);
  const [invitations, setInvitations] = useState([]);

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

  const genreOptions = ["Rock", "Acoustic", "Jazz", "Pop", "Hip Hop", "Other"];
  const [genreDDOpen, setGenreDDOpen] = useState(false);
  const [genre, setGenre] = useState("Rock");
  const [repGenre, setRepGenre] = useState("Acoustic");

  const [leaveBandModal, setLeaveBandModal] = useState(null);
  const [deleteBandModal, setDeleteBandModal] = useState(null);

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
                      <div
                        style={{
                          overflowX: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: 150
                        }}
                      >
                        <a target="_blank" href={linkObj.link}>
                          {linkObj.link}
                        </a>
                      </div>
                      {isBandMember && (
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

                {isBandMember && (
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
              {isBandAdmin ? (
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
                    Looking for new Members:{" "}
                    <Input
                      type="checkbox"
                      id="helpLookingForMember"
                      checked={band.isLookingForMember}
                      style={{
                        position: "relative",
                        margin: 0,
                        marginLeft: 10
                      }}
                      onClick={() => {
                        axios
                          .post("/api/band/setIsLookingForMembers", {
                            bandId: band.bandId,
                            isLooking: !band.isLookingForMember
                          })
                          .then(res => {
                            if (res.data.success) {
                              window.location.reload();
                            } else {
                              alert("Internal error. Please try again");
                            }
                          })
                          .catch(err => {});
                        // make axios call to change the islooking for member in db and refresh page
                      }}
                    />
                  </div>

                  <UncontrolledTooltip
                    placement="right"
                    target="helpLookingForMember"
                  >
                    Checking this will allow non members users of this band to
                    send invitations to join.
                    <br />
                    The band admin will be able to accept or reject the
                    invitation.
                  </UncontrolledTooltip>
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
                !isBandMember && (
                  <>
                    {userObj && band.isLookingForMember ? (
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
                    ) : null}
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
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 4 }} />
                  {band.numMembers}
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
                <div style={{ fontSize: 35, fontWeight: 700 }}>
                  Members{" "}
                  {isBandAdmin ? (
                    <Button
                      onClick={() => {
                        setDeleteBandModal(true);
                      }}
                      color="danger"
                      style={{ marginLeft: 30 }}
                    >
                      Delete Band
                    </Button>
                  ) : isBandMember ? (
                    <Button
                      onClick={() => {
                        setLeaveBandModal(true);
                      }}
                      color="danger"
                      style={{ marginLeft: 30 }}
                    >
                      Leave Band
                    </Button>
                  ) : null}
                </div>

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
              {isBandMember && (
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
                    isBandMember={isBandMember}
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
              {isBandMember && (
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
                  <BandPostItem key={i} {...post} isBandMember={isBandMember} />
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
              {isBandMember && (
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
                    {isBandMember && (
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
                    <EventCard
                      {...event}
                      loc={event.location}
                      bandName={event.name}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <ReloadPage value="band events" />
            )}
          </div>

          {isBandMember && (
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
                    id="sendInviteMessage"
                    type="textarea"
                    style={{ marginTop: 10, minHeight: 200 }}
                    maxLength={1000}
                  />
                  <FormText color="muted">Max 1000 characters</FormText>
                  <Button
                    onClick={() => {
                      let message = document.getElementById("sendInviteMessage")
                        .value;

                      axios
                        .post("/api/user/sendinvite", {
                          bandId: band.bandId,
                          message
                        })
                        .then(res => {
                          if (res.data.success) {
                            setSendInviteModal(!sendInviteModal);
                            alert("Successfully sent the invite!");
                          } else {
                            alert(
                              "Error in sending Invite, Please try again later."
                            );
                          }
                        })
                        .catch(err => {});
                    }}
                    color="primary"
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 10
                }}
              >
                <Input
                  id="addBandLinkKey"
                  placeholder="key. Ex: youtube"
                  style={{ marginRight: 5 }}
                />
                {" : "}
                <Input
                  id="addBandLinkLink"
                  placeholder="Link. Ex: www.youtube.com/"
                  style={{ marginLeft: 5 }}
                />
              </div>

              <Button
                onClick={() => {
                  let key = document.getElementById("addBandLinkKey").value;
                  let link = document.getElementById("addBandLinkLink").value;
                  // TODO: add validateUrl(link)
                  if (key && link && key.length > 0 && link.length > 0) {
                    // TODO: change this to band add link route
                    axios
                      .post("/api/band/createLink", {
                        link: { key: key, link: link },
                        bandId: band.bandId
                      })
                      .then(res => {
                        if (res.data.success) {
                          window.location.reload();
                        } else {
                          alert(
                            "Error in adding Link, Please try again later. (You can only enter 5 links)"
                          );
                        }
                      })
                      .catch(err => {});
                  } else {
                    alert("please enter a key and a valid link");
                  }
                }}
                color="primary"
                style={{ float: "right", marginTop: 10 }}
              >
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
                <Button
                  onClick={() => {
                    axios
                      .post("/api/band/deleteLink", {
                        bandId: band.bandId,
                        link: deleteLink
                      })
                      .then(res => {
                        if (res.data.success) {
                          window.location.reload();
                        } else {
                          alert("Please recheck your values and try again.");
                        }
                      })
                      .catch(err => {});
                  }}
                  color="danger"
                >
                  Delete Link
                </Button>
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
                {invitations.length === 0 && (
                  <div
                    style={{
                      marginTop: 50,
                      marginBottom: 50,
                      textAlign: "center"
                    }}
                  >
                    There are not invitations sent to your band.
                  </div>
                )}
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
                        onClick={() => {
                          axios
                            .post("/api/band/acceptInvite", {
                              inviteId: invitation.inviteId,
                              bandId: band.bandId,
                              userId: invitation.userId
                            })
                            .then(res => {
                              if (res.data.success) {
                                window.location.reload();
                              } else {
                                alert(
                                  "Error in accepting the invite, Please try again later."
                                );
                              }
                            })
                            .catch(err => {});
                        }}
                        style={{ marginRight: 15, backgroundColor: "#000000" }}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => {
                          axios
                            .post("/api/band/deleteInvite", {
                              inviteId: invitation.inviteId
                            })
                            .then(res => {
                              if (res.data.success) {
                                window.location.reload();
                              } else {
                                alert(
                                  "Error in deleting the invite, Please try again later."
                                );
                              }
                            })
                            .catch(err => {});
                        }}
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
                <Button
                  onClick={() => {
                    axios
                      .post("/api/band/deleteEvent", {
                        eventId: deleteEvent.eventId
                      })
                      .then(res => {
                        if (res.data.success) {
                          window.location.reload();
                        } else {
                          alert("unable to delete the event. Please retry.");
                        }
                      })
                      .catch(err => {});
                  }}
                  color="danger"
                >
                  Delete Event
                </Button>
              </div>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={editBandModal}
            toggle={() => {
              setEditBandModal(!editBandModal);
            }}
            backdrop="static"
          >
            <ModalHeader
              toggle={() => {
                setEditBandModal(!editBandModal);
              }}
            >
              Edit Band Info
            </ModalHeader>
            <ModalBody>
              <Label>Band's Name</Label>
              <Input
                id="editBandName"
                style={{ marginBottom: 20 }}
                placeholder="Band name"
                defaultValue={band.name}
              />

              <Label>Band's Genre:</Label>
              <Dropdown
                isOpen={genreDDOpen}
                toggle={() => {
                  setGenreDDOpen(!genreDDOpen);
                }}
                style={{ marginLeft: 20, marginBottom: 20 }}
              >
                <DropdownToggle caret style={{ backgroundColor: "#000000" }}>
                  {genre ? genre : "All"}
                </DropdownToggle>
                <DropdownMenu>
                  {genreOptions.map(genreOption => (
                    <DropdownItem
                      key={genreOption}
                      onClick={() => {
                        setGenre(genreOption === "All" ? null : genreOption);
                      }}
                    >
                      {genreOption}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Label>Band's Location:</Label>
              <div
                style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
              >
                <Input
                  id="editBandStreet"
                  placeholder="street"
                  style={{
                    margin: 5
                  }}
                  defaultValue={
                    band.location && band.location.street
                      ? band.location.street
                      : ""
                  }
                />
                <div style={{ display: "flex" }}>
                  <Input
                    id="editBandCity"
                    placeholder="city"
                    style={{
                      margin: 5
                    }}
                    defaultValue={
                      band.location && band.location.city
                        ? band.location.city
                        : ""
                    }
                  />
                  <Input
                    id="editBandState"
                    placeholder="state"
                    style={{
                      margin: 5
                    }}
                    defaultValue={
                      band.location && band.location.state
                        ? band.location.state
                        : ""
                    }
                  />
                  <Input
                    id="editBandZip"
                    placeholder="zip"
                    style={{
                      margin: 5
                    }}
                    defaultValue={
                      band.location && band.location.zip
                        ? band.location.zip
                        : ""
                    }
                  />
                </div>
              </div>

              <Label>Band's Description</Label>
              <Input
                id="editBandDesc"
                type="textarea"
                style={{ marginBottom: 20, minHeight: 200 }}
                placeholder="Write something that describes your band"
                defaultValue={band.description ? band.description : null}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    setEditBandModal(false);
                  }}
                  color="danger"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    let name = document.getElementById("editBandName").value;
                    let street = document.getElementById("editBandStreet")
                      .value;
                    let city = document.getElementById("editBandCity").value;
                    let state = document.getElementById("editBandState").value;
                    let zip = document.getElementById("editBandZip").value;
                    let description = document.getElementById("editBandDesc")
                      .value;

                    axios
                      .post("/api/band/editBandInfo", {
                        bandId: band.bandId,
                        name,
                        description,
                        location: { street, city, state, zip },
                        genre: genre
                      })
                      .then(res => {
                        console.log("came here");
                        if (res.data.success) {
                          props.history.push("/band/" + name);
                        } else {
                          alert("Please recheck your values and try again.");
                        }
                      })
                      .catch(err => {
                        console.log("err", err);
                      });
                    // axios call
                  }}
                  color="primary"
                >
                  Done
                </Button>
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
              <Label>Repertoir Genre:</Label>
              <Dropdown
                isOpen={genreDDOpen}
                toggle={() => {
                  setGenreDDOpen(!genreDDOpen);
                }}
                style={{ marginLeft: 20, marginBottom: 20 }}
              >
                <DropdownToggle caret style={{ backgroundColor: "#000000" }}>
                  {repGenre ? repGenre : "-"}
                </DropdownToggle>
                <DropdownMenu>
                  {genreOptions.map(genreOption => (
                    <DropdownItem
                      key={genreOption}
                      onClick={() => {
                        setRepGenre(genreOption);
                      }}
                    >
                      {genreOption}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
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
              <Button
                onClick={() => {
                  let name = document.getElementById("addRepName").value;
                  let link = document.getElementById("addRepLink").value;

                  let DurationMin = document.getElementById("addRepDurationMin")
                    .value;
                  let DurationSec = document.getElementById("addRepDurationSec")
                    .value;
                  axios
                    .post("/api/band/createRep", {
                      songName: name,
                      runTime: DurationMin + ":" + DurationSec,
                      genre: repGenre,
                      link,
                      bandId: band.bandId
                    })
                    .then(res => {
                      if (res.data.success) {
                        window.location.reload();
                      } else {
                        alert("Please recheck your values and try again.");
                      }
                    })
                    .catch(err => {});
                }}
                color="primary"
              >
                Add Repertoir
              </Button>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={addPostModal}
            toggle={() => {
              setAddPostModal(!addPostModal);
            }}
            backdrop="static"
          >
            <ModalHeader
              toggle={() => {
                setAddPostModal(!addPostModal);
              }}
            >
              Add new Post to your band
            </ModalHeader>
            <ModalBody>
              <Input
                id="addPostTitle"
                style={{ marginBottom: 20 }}
                placeholder="Title of this Post"
              />
              <Input
                id="addPostDescription"
                type="textarea"
                style={{ marginBottom: 20 }}
                placeholder="Description for this Post"
              />
              <Input
                id="addPostMedia"
                placeholder="Link to an image for this Post."
              />
              <FormText
                color="muted"
                style={{ marginBottom: 20, marginLeft: 20 }}
              >
                Example: https://www.sfsu.edu/SFState_logo_color.jpg
                <br /> We will soon add support for uploading images and videos.
              </FormText>

              <Button
                onClick={() => {
                  let title = document.getElementById("addPostTitle").value;
                  let description = document.getElementById(
                    "addPostDescription"
                  ).value;
                  let media = document.getElementById("addPostMedia").value;

                  axios
                    .post("/api/band/createBandPost", {
                      media,
                      title,
                      description,
                      bandId: band.bandId
                    })
                    .then(res => {
                      if (res.data.success) {
                        window.location.reload();
                      } else {
                        alert("Please recheck your values and try again.");
                      }
                    })
                    .catch(err => {});
                }}
                color="primary"
              >
                Add Post
              </Button>
            </ModalBody>
          </Modal>

          {/* {
      //     title: "LowKey Sessions",
      //     description:
      //       "We are planning a lowkey event to happen this Wednesday and would for you to join us! We will be playing some of our famous tracks and then will be taking public requests!",
      //     date: "Sept 21 2020",
      //     startTime: "8:30 pm",
      //     endTime: "10:30 pm",
      //     genre: "mellow",
      //     bandId: "3423342344",
      //     bandName: "Beatles",
      //     loc: {
      //       street: "100 font blvd",
      //       city: "San Francisco",
      //       state: "California",
      //       zip: "94132"
      //     }
      //   } */}

          <Modal
            isOpen={addEventModal}
            toggle={() => {
              setAddEventModal(!addEventModal);
            }}
            backdrop="static"
          >
            <ModalHeader
              toggle={() => {
                setAddEventModal(!addEventModal);
              }}
            >
              Add new Event to your band
            </ModalHeader>
            <ModalBody>
              <Input
                id="addEventTitle"
                style={{ marginBottom: 20 }}
                placeholder="Title of this Event"
              />
              <Input
                id="addEventDescription"
                type="textarea"
                style={{ marginBottom: 20 }}
                placeholder="Description for this Event"
              />
              <Input
                id="addEventDate"
                type="date"
                style={{ marginBottom: 20 }}
                placeholder="Date of this Event"
              />
              <Input
                id="addEventStartTime"
                type="time"
                style={{ marginBottom: 20 }}
                placeholder="Start time of this Event"
              />
              <Input
                id="addEventEndTime"
                type="time"
                style={{ marginBottom: 20 }}
                placeholder="End time of this Event"
              />
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex" }}>Location:</div>
                <div style={{ marginLeft: 20, marginRight: 20 }}>
                  <Input
                    id="addEventStreet"
                    placeholder="street"
                    style={{
                      margin: 5
                    }}
                  />
                  <div style={{ display: "flex" }}>
                    <Input
                      id="addEventCity"
                      placeholder="city"
                      style={{
                        margin: 5
                      }}
                    />

                    <Input
                      id="addEventState"
                      placeholder="state"
                      style={{
                        margin: 5
                      }}
                    />

                    <Input
                      id="addEventZip"
                      placeholder="zip"
                      style={{
                        margin: 5
                      }}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  let title = document.getElementById("addEventTitle").value;
                  let description = document.getElementById(
                    "addEventDescription"
                  ).value;
                  let date = document.getElementById("addEventDate").value;
                  let startTime = document.getElementById("addEventStartTime")
                    .value;
                  let endTime = document.getElementById("addEventEndTime")
                    .value;
                  let street = document.getElementById("addEventStreet").value;
                  let city = document.getElementById("addEventCity").value;
                  let state = document.getElementById("addEventState").value;
                  let zip = document.getElementById("addEventZip").value;
                  axios
                    .post("/api/band/createEvent", {
                      title,
                      description,
                      date,
                      startTime,
                      endTime,
                      location: { street, city, state, zip },
                      bandId: band.bandId
                    })
                    .then(res => {
                      if (res.data.success) {
                        window.location.reload();
                      } else {
                        alert(
                          "Error adding the event, Please check your values and try again."
                        );
                      }
                    })
                    .catch(err => {});
                }}
                color="primary"
              >
                Add Event
              </Button>
            </ModalBody>
          </Modal>

          {/* leave/delete Band modals */}

          <Modal
            isOpen={deleteBandModal}
            toggle={() => setDeleteBandModal(!deleteBandModal)}
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
              Are you sure you want to delete this Band?
              <br />
              This action is irreversable.
              <br />
              Removing this band will result in removing all Members, Repertoir
              entries, Posts and Events related to this band.
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  onClick={() => {
                    setDeleteBandModal(!deleteBandModal);
                  }}
                  color="dark"
                >
                  Cancel
                </Button>
                <Button color="danger">Delete Band</Button>
              </div>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={leaveBandModal}
            toggle={() => setLeaveBandModal(!leaveBandModal)}
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
              Are you sure you want to leave this Band?
              <br />
              This action is irreversable.
              <br />
              To re-enter you will have to send a join invite which shall be
              accepted by the band Admin.
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  onClick={() => {
                    setLeaveBandModal(!leaveBandModal);
                  }}
                  color="dark"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    axios
                      .post("/api/band/leaveBand", { bandId: band.bandId })
                      .then(res => {
                        if (res.data.success) {
                          window.location.reload();
                        } else {
                          alert(
                            "Error leaving the band. Please try again later."
                          );
                        }
                      })
                      .catch(err => {});
                  }}
                  color="danger"
                >
                  Leave Band
                </Button>
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

export default withRouter(BandProfilePage);
