import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CustomInput
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faSearch,
  faFilter,
  faPlus,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const EventSearchBar = props => {
  const [filterEventModal, setFilterEventModal] = useState(false);
  const toggleFilterEventModal = () => setFilterEventModal(!filterEventModal);

  const [searchName, setSearchName] = useState("");

  const searchEvents = () => {
    // let params = {};
    // params["name"] = !searchName || searchName.length <= 0 ? null : searchName;
    // params["type"] = !filterType || filterType.length <= 0 ? null : filterType;
    // params["numMembers"] =
    //   !filterNumMembers || !isNaN(filterNumMembers) || filterNumMembers <= 0
    //     ? 1
    //     : filterType;
    // Axios.post("/api/mockBand/searchBand", params)
    //   .then(resp => {
    //     if (resp.data.success) {
    //       props.setBands(resp.data.result);
    //     }
    //   })
    //   .catch(err => {});
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          padding: 20
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontFamily: "roboto",
            fontWeight: 600,
            fontSize: 35,
            padding: 25
          }}
        >
          Explore Events Nearby
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 25
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 25,
              padding: 5,
              marginRight: 25
            }}
          >
            <Input
              value={searchName}
              onChange={ev => {
                setSearchName(ev.target.value);
              }}
              placeholder="Search..."
              style={{
                width: "30vw",
                minWidth: 100,
                marginRight: 10,
                borderWidth: 0,
                borderRadius: 25
              }}
            />

            <Button
              onClick={() => {
                searchEvents();
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                textAlign: "center",
                backgroundColor: "#000000"
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                style={{ width: 15, height: 15 }}
              />
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                toggleFilterEventModal();
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff"
              }}
            >
              <FontAwesomeIcon
                icon={faSlidersH}
                color="#CB0086"
                style={{ fontSize: 20 }}
              />
            </Button>
          </div>
        </div>
        {/* <Button
          onClick={toggleCreateBandModal}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            textAlign: "center",
            backgroundColor: "#000000"
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ width: 15, height: 15 }} />
        </Button> */}
      </div>
      <Modal
        isOpen={filterEventModal}
        toggle={toggleFilterEventModal}
        backdrop={"static"}
      >
        <ModalHeader toggle={toggleFilterEventModal}>Filter Bands:</ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: 15 }}>
            <div style={{ display: "flex" }}>Location:</div>
            <div style={{ marginLeft: 20, marginRight: 20 }}>
              <Input
                id="filterEventStreet"
                placeholder="street"
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />
              <div style={{ display: "flex" }}>
                <Input
                  id="filterEventCity"
                  placeholder="city"
                  style={{
                    borderRadius: 25,
                    margin: 5
                  }}
                />

                <Input
                  id="filterEventState"
                  placeholder="state"
                  style={{
                    borderRadius: 25,
                    margin: 5
                  }}
                />

                <Input
                  id="filterEventZip"
                  placeholder="zip"
                  style={{
                    borderRadius: 25,
                    margin: 5
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 25 }}
          >
            <div style={{ marginRight: 10 }}>Date</div>
            <Input
              id="filterEventEmail"
              type="date"
              placeholder="MM - DD - YYYY"
              style={{
                borderRadius: 25
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                toggleFilterEventModal();
              }}
              style={{
                borderRadius: 20,
                textAlign: "center",
                backgroundColor: "#000000"
              }}
            >
              Apply filters
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EventSearchBar;
