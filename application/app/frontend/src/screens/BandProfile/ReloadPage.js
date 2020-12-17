import React from "react";
import { Button } from "reactstrap";
const ReloadPage = props => {
  return (
    <div>
      <div
        style={{
          height: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <div>Could not fetch {props.value}.</div>
        <Button color="primary">Retry</Button>
      </div>
    </div>
  );
};

export default ReloadPage;
