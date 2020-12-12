import React from "react";
import { Row, Col, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const MusicRepItem = props => {
  return (
    <Row
      style={{
        marginBottom: 30,
        alignItems: "center",
        flexWrap: "nowrap"
      }}
    >
      <Col xs="1">{props.index + 1}.</Col>
      <Col xs="6" style={{ minWidth: 180 }}>
        <div>{props.name}</div>
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
        {props.duration}
      </Col>
    </Row>
  );
};

export default MusicRepItem;
