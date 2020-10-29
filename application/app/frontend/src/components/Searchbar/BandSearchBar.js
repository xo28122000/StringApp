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
  faPlus
} from "@fortawesome/free-solid-svg-icons";

const BandSearchBar = () => {
  const [createBandModal, setCreateBandModal] = useState(false);
  const toggleCreateBandModal = () => setCreateBandModal(!createBandModal);

  const [createTypeDDOpen, setCreateTypeDDOpen] = useState(false);
  const toggleCreateTypeDDOpen = () => setCreateTypeDDOpen(!createTypeDDOpen);

  const [createName, setCreateName] = useState("");
  const [createType, setCreateType] = useState(null);
  const [createNumBandMembers, setCreateNumBandMembers] = useState(1);

  const [filterTypeDDOpen, setFilterTypeDDOpen] = useState(false);
  const toggleFilterTypeDDOpen = () => setFilterTypeDDOpen(!filterTypeDDOpen);

  const [filterType, setFilterType] = useState(null);
  const [filterNumMembers, setFilterNumMembers] = useState(1);

  return (
    <div style={{ padding: 10 }}>
      <Modal
        isOpen={createBandModal}
        toggle={toggleCreateBandModal}
        backdrop={"static"}
      >
        <ModalHeader toggle={toggleCreateBandModal}>Create a Band</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name of your Band</Label>
              <Input />
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
            <CustomInput type="file" accept=".jpg,.jpeg,.png" />
          </FormGroup>
          <Button color={"primary"}>Create</Button>
          <FormText color="muted">
            You can only create a limited number of Bands in an hour.
          </FormText>
        </ModalBody>
      </Modal>
      <div style={{ display: "flex" }}>
        <Input
          type="text"
          name="name"
          id="bandNameSearch"
          placeholder="Search Bands"
          style={{ width: "60vw", minWidth: 100 }}
        />

        <Button
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            textAlign: "center",
            backgroundColor: "#000000"
          }}
        >
          <FontAwesomeIcon icon={faSearch} style={{ width: 15, height: 15 }} />
        </Button>

        <Button
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
        </Button>
      </div>
      <div style={{}}>
        <FontAwesomeIcon icon={faFilter} style={{ width: 15, height: 15 }} />{" "}
        Filters:
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 10 }}>Type of music :</div>

            <Dropdown isOpen={filterTypeDDOpen} toggle={toggleFilterTypeDDOpen}>
              <DropdownToggle caret>
                {filterType ? filterType : "All"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setFilterType(null);
                  }}
                >
                  All
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterType("rock");
                  }}
                >
                  Rock
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterType("accoustic");
                  }}
                >
                  Accoustic
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterType("jazz");
                  }}
                >
                  Jazz
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterType("pop");
                  }}
                >
                  Pop
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterType("hip hop");
                  }}
                >
                  Hip Hop
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 30 }}
          >
            <div style={{ marginRight: 20 }}>
              Minimum Number of Band members:
            </div>
            <div>
              <Input
                value={filterNumMembers}
                onChange={e => {
                  setFilterNumMembers(e.target.value);
                }}
                onKeyPress={ev => {
                  ev.preventDefault();
                  return false;
                }}
                min={0}
                max={40}
                type="number"
                name="numOfBandMembers"
                placeholder="1"
                style={{ width: 65 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandSearchBar;
