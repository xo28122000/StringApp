import React, { useState } from "react";
import {
  Row,
  Col,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const MusicRepItem = props => {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <>
      <Row
        style={{
          marginBottom: 30,
          alignItems: "center",
          flexWrap: "nowrap"
        }}
      >
        <Col xs="1">{props.index + 1}.</Col>
        <Col xs="6" style={{ minWidth: 180 }}>
          <div>{props.songName}</div>
          <div style={{ fontSize: 13, color: "#CB0086" }}>{props.link}</div>
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
            <FontAwesomeIcon icon={faMusic} style={{ marginRight: 5 }} />
            {props.genre}
          </Badge>
        </Col>
        <Col xs="2" style={{ textAlign: "center", minWidth: 100 }}>
          {props.runTime}
        </Col>
      </Row>
      {props.isBandMember && (
        <>
          <Row
            style={{
              marginBottom: 30,
              justifyContent: "flex-end"
            }}
          >
            <Button
              color="danger"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </Row>

          <Modal
            isOpen={deleteModal}
            toggle={() => setDeleteModal(!deleteModal)}
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
              Are you sure you want to delete "{props.songName}" rep entry?
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  onClick={() => {
                    setDeleteModal(!deleteModal);
                  }}
                  color="dark"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    Axios.post("/api/band/deleteRep", { repId: props.repId })
                      .then(res => {
                        console.log(res.data);
                      })
                      .catch(err => {});
                  }}
                  color="danger"
                >
                  Delete rep entry
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
};

export default MusicRepItem;
