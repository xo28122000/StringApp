import React from "react";

const BandCard = band => {
  return (
    <div style={{ borderWidth: 2, borderStyle: "solid", margin: 10 }}>
      <div>{band.name}</div>
      <div>{band.type}</div>
    </div>
  );
};

export default BandCard;
