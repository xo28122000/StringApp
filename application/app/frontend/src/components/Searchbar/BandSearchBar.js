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
  faSlidersH,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const BandSearchBar = props => {
  const genreOptions = ["All", "Rock", "Acoustic", "Jazz", "Pop", "Hip Hop"];

  const [filterBandModal, setFilterBandModal] = useState(false);
  const toggleFilterBandModal = () => setFilterBandModal(!filterBandModal);

  const [filterGenreDDOpen, setFilterGenreDDOpen] = useState(false);
  const toggleFilterGenreDDOpen = () =>
    setFilterGenreDDOpen(!filterGenreDDOpen);

  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState(null);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [isLooking, setIsLooking] = useState(false);

  const searchBands = () => {
    Axios.post("/api/band/searchBands", {
      name: searchName,
      genre: filterType,
      location: {
        street,
        city,
        state,
        zip
      },
      isLookingForMember: isLooking
    })
      .then(resp => {
        if (resp.data.success) {
          props.setBands(resp.data.result);
          setFilterBandModal(false);
        } else {
          alert("incorrect filter or search values");
        }
      })
      .catch(err => {
        alert("an error occured. Please try again later.");
      });
  };

  return (
    <div>
      <Modal
        isOpen={filterBandModal}
        toggle={toggleFilterBandModal}
        backdrop={"static"}
      >
        <ModalHeader toggle={toggleFilterBandModal}>Filter Bands:</ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: 15 }}>
            <div style={{ display: "flex" }}>Location:</div>
            <div style={{ marginLeft: 20, marginRight: 20 }}>
              <Input
                id="filterLocationStreet"
                placeholder="street"
                value={street}
                onChange={ev => {
                  setStreet(ev.target.value);
                }}
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />

              <Input
                id="filterLocationCity"
                placeholder="city"
                value={city}
                onChange={ev => {
                  setCity(ev.target.value);
                }}
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />

              <Input
                id="filterLocationState"
                placeholder="state"
                value={state}
                onChange={ev => {
                  setState(ev.target.value);
                }}
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />

              <Input
                id="filterLocationZip"
                placeholder="zip"
                value={zip}
                onChange={ev => {
                  setZip(ev.target.value);
                }}
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            Genre:
            <Dropdown
              isOpen={filterGenreDDOpen}
              toggle={toggleFilterGenreDDOpen}
              style={{ marginLeft: 20 }}
            >
              <DropdownToggle caret style={{ backgroundColor: "#000000" }}>
                {filterType ? filterType : "All"}
              </DropdownToggle>
              <DropdownMenu>
                {genreOptions.map(genreOption => (
                  <DropdownItem
                    key={genreOption}
                    onClick={() => {
                      setFilterType(genreOption === "All" ? null : genreOption);
                    }}
                  >
                    {genreOption}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <FormGroup check>
              <Label check>
                <Input
                  id="filterBandsAccepting"
                  type="checkbox"
                  value={isLooking}
                  onChange={ev => {
                    setIsLooking(ev.target.checked);
                  }}
                />{" "}
                Only Bands looking for members
              </Label>
            </FormGroup>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                searchBands();
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
          Explore Bands Nearby
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
              placeholder="Search for bands by their name"
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
                searchBands();
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
                toggleFilterBandModal();
              }}
              style={{
                height: 40,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontSize: 18,
                fontWeight: 500
              }}
            >
              <FontAwesomeIcon
                icon={faSlidersH}
                color="#CB0086"
                style={{ fontSize: 20, marginRight: 5 }}
              />{" "}
              Filters
            </Button>
          </div>
          {(street ||
            city ||
            state ||
            zip ||
            searchName ||
            filterType ||
            isLooking) && (
            <div style={{ marginLeft: 25 }}>
              <Button
                color="danger"
                onClick={() => {
                  setStreet("");
                  setCity("");
                  setState("");
                  setZip("");
                  setSearchName("");
                  setFilterType(null);
                  setIsLooking(false);

                  Axios.post("/api/band/searchBands", {})
                    .then(resp => {
                      if (resp.data.success) {
                        props.setBands(resp.data.result);
                        setFilterBandModal(false);
                      } else {
                      }
                    })
                    .catch(err => {
                      alert("an error occured. Please try again later.");
                    });
                }}
                style={{
                  height: 40,
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#000000",
                  fontSize: 18,
                  fontWeight: 500
                }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  color="#000000"
                  style={{ fontSize: 20, marginRight: 5 }}
                />{" "}
                Clear Filters
              </Button>
            </div>
          )}
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
    </div>
  );
};

export default BandSearchBar;

// create mocband modal:

/* <Modal
        isOpen={createBandModal}
        toggle={toggleCreateBandModal}
        backdrop={"static"}
      >
        <ModalHeader toggle={toggleCreateBandModal}>Create a Band</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name of your Band</Label>
              <Input
                value={createName}
                onChange={ev => {
                  setCreateName(ev.target.value);
                }}
              />
            </FormGroup>
          </Form>
          <FormGroup>
            <Label>Type of music</Label>
            <Dropdown isOpen={createTypeDDOpen} toggle={toggleCreateTypeDDOpen}>
              <DropdownToggle caret>
                {createType ? createType : "Please select a type"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setCreateType("rock");
                  }}
                >
                  Rock
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setCreateType("accoustic");
                  }}
                >
                  Accoustic
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setCreateType("jazz");
                  }}
                >
                  Jazz
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setCreateType("pop");
                  }}
                >
                  Pop
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setCreateType("hip hop");
                  }}
                >
                  Hip Hop
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Number Of Band Members</Label>
            <Input
              value={createNumBandMembers}
              onChange={ev => {
                setCreateNumBandMembers(ev.target.value);
              }}
              type="number"
              placeholder="1"
              min={1}
              max={30}
              onKeyPress={ev => {
                ev.preventDefault();
                return false;
              }}
            />
            <FormText color="muted">
              Use the spinner to change the number
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label>Upload your Band Logo</Label>
            <CustomInput
              id="createBandFileInput"
              type="file"
              accept="image/jpg,image/jpeg,image/png"
            />
          </FormGroup>
          <Button
            onClick={() => {
              createBand();
            }}
            color={"primary"}
          >
            Create
          </Button>
          <FormText color="muted">
            You can only create a limited number of Bands in an hour.
          </FormText>
        </ModalBody>
      </Modal> */

//
//
//
//

// const createBand = () => {
//   var imageFileInput = document.getElementById("createBandFileInput");
//   if (
//     !createName ||
//     createName.length <= 0 ||
//     !createType ||
//     !isNaN(createNumBandMembers) ||
//     createNumBandMembers < 1 ||
//     imageFileInput.files.length !== 1
//   ) {
//     alert(
//       "Check the input fields and retry again. All fields are compulsary."
//     );
//   } else if ((imageFileInput.files[0].size / 1024 / 1024).toFixed(4) > 10) {
//     alert("Please use a file of size smaller than 10mb");
//   } else {
//     toggleCreateBandModal();
//     var formData = new FormData();
//     formData.append("imageFile", imageFileInput.files[0]);
//     formData.append("name", createName);
//     formData.append("type", createType);
//     formData.append("numMembers", createNumBandMembers);
//     Axios.post("/api/mockBand/createBand", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     })
//       .then(resp => {
//         if (!resp.data.success) {
//           alert("failed to create band");
//         }
//       })
//       .catch(err => {
//         alert("failed to create band");
//       });
//   }
// };
