import React from "react";
import bandPostImage from "../../assets/bandProfile/bandPost.jpg";
import { Card, Modal, ModalBody, Button } from "reactstrap";
const BandPostItem = props => {
  const [deletePostModal, setDeletePostModal] = React.useState(false);
  return (
    <div style={{ margin: 25 }}>
      {props.isBandMember && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "rgbs(0,0,0,0)"
          }}
        >
          <Button
            color="danger"
            onClick={() => {
              setDeletePostModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      )}
      <Card
        className="divShadow"
        style={{
          backgroundColor: "#ffffff",
          width: 250,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          borderWidth: 0,
          zIndex: 1
        }}
      >
        <div
          style={{
            maxHeight: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <img src={bandPostImage} style={{ width: 250, maxHeight: 250 }} />
        </div>
        <div style={{ padding: 30, paddingTop: 10 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 20
            }}
          >
            {props.title}
          </div>

          <div style={{ fontSize: 15, maxHeight: 80, overflowY: "auto" }}>
            {props.description}
          </div>
        </div>
      </Card>

      <Modal
        isOpen={deletePostModal}
        toggle={() => setDeletePostModal(!deletePostModal)}
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
          Are you sure you want to delete "{props.title}" post?
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <Button
              onClick={() => {
                setDeletePostModal(!deletePostModal);
              }}
              color="dark"
            >
              Cancel
            </Button>
            <Button color="danger">Delete Post</Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BandPostItem;
