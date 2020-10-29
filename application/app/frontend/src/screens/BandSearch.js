import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import BandSearchBar from "../components/Searchbar/BandSearchBar";
import BandCard from "../components/Cards/BandCard";

const BandSearch = () => {
  const [bands, setBands] = useState([
    { name: "band1", type: "sometype" },
    { name: "band2", type: "blah" },
    { name: "band3", type: "sometype" },
    { name: "band4", type: "sometype" }
  ]);

  return (
    <div>
      <div>
        <BandSearchBar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {bands.map(band => (
          <BandCard {...band} />
        ))}
      </div>
    </div>
  );
};

export default BandSearch;
