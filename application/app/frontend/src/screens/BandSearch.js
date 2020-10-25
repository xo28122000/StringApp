import React from "react";
import BandSearchBar from "../components/Searchbar/BandSearchBar";
import BandCard from "../components/Cards/BandCard";

const BandSearch = () => {
  const [bands, setBands] = React.useState([
    { name: "band1", type: "sometype" },
    { name: "band2", type: "blah" },
    { name: "band3", type: "sometype" },
    { name: "band4", type: "sometype" }
  ]);
  return (
    <div>
      BandSearch
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
