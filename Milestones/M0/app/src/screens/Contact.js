import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import "../css/About.css";

function ValidateEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

const FormItem = props => {
  return (
    <div
      style={{
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderColor: "#D2D1D1",
        paddingTop: 5,
        paddingBottom: 5,
        width: "40%",
        minWidth: 300
      }}
    >
      <div className="contact-form-text">{props.label}</div>
      <Input
        className="contact-input-text"
        type={props.type}
        name={props.name}
        id={props.id}
        maxLength={props.maxlength}
        style={{
          borderWidth: 0,

          minHeight: props.minHeight ? props.minHeight : "auto",
          maxHeight: props.maxHeight ? props.maxHeight : "auto"
        }}
      />
    </div>
  );
};

const ContactScreen = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const testalphanumeric = string => {
    return /\d/.test(string) || /[a-zA-Z]/.test(string);
  };

  const submitForm = () => {
    setButtonDisabled(true);
    let name = document.getElementById("contact_name").value;
    let email = document.getElementById("contact_email").value;
    let description = document.getElementById("contact_description").value;
    if (
      !testalphanumeric(name) &&
      !testalphanumeric(email) &&
      !testalphanumeric(description)
    ) {
      setErrorMessage("all fields cannot be empty or invalid");
      setButtonDisabled(false);
    } else if (email && !ValidateEmail(email)) {
      setErrorMessage("incorrect email");
      setButtonDisabled(false);
    } else {
      Axios.post("/contact", {
        name: name ? name : "",
        email: email ? email : "",
        description: description ? description : ""
      })
        .then(resp => {
          if (resp.data.error) {
            console.log("error");
            setErrorMessage("please try again later!");
          } else {
            setErrorMessage(null);
            setFormSent(true);
          }
          setButtonDisabled(false);
        })
        .catch(error => {
          console.log(error);
          setErrorMessage("please try again later!");
          setButtonDisabled(false);
        });
    }
  };
  return (
    <div>
      <Navbar img={false} textColor={"#000000"} />
      <div className="page-header">
        STAY IN
        <br /> TOUCH
      </div>
      <div
        style={{
          margin: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FormItem
          label={"name"}
          type={"text"}
          name={"name"}
          id={"contact_name"}
          maxlength={30}
        />
        <FormItem
          label={"email"}
          type={"email"}
          name={"email"}
          id={"contact_email"}
          maxlength={255}
        />
        <FormItem
          label={"Remarks"}
          type={"textarea"}
          name={"description"}
          id={"contact_description"}
          minHeight={100}
          maxHeight={300}
          maxlength={400}
        />
        {formSent ? (
          <div className="contact-form-text" style={{ marginTop: 40 }}>
            All done!
          </div>
        ) : (
          <Button
            disabled={buttonDisabled}
            className="contact-form-text"
            style={{
              marginTop: 40,
              borderRadius: 30,
              width: 150,
              backgroundColor: "#000000"
            }}
            onClick={() => {
              submitForm();
            }}
          >
            Send <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        )}

        <div
          className="contact-form-error-text"
          style={{ marginTop: 20, color: "" }}
        >
          {errorMessage ? errorMessage : null}
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
