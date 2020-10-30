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
  const [bands, setBands] = useState([]);

  return (
    <div>
      <div>
        <BandSearchBar setBands={setBands} />
      </div>
      <div
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {bands.length <= 0 && (
          <div>
            Use the create and search feature to create and search bands
          </div>
        )}
        {bands.map(band => (
          <BandCard
            {...band}
            imgUrl={
              "https://csc648-string.s3-us-west-1.amazonaws.com/" + band.imgUrl
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BandSearch;
