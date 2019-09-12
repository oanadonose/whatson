import React, { Component } from "react";

class Location extends Component {
  constructor(props) {
    super(props);
    console.log("[Location] constructor");
    this.state = {
      location: "LE50QA",
      input: "off",
      message: "Change postcode"
    };
  }

  toggleInput = () => {
    console.log("input cliked");
    if (this.state.input === "off") {
      this.setState({
        input: "on",
        message: "Press Enter to submit"
      });
    } else {
      this.setState({
        input: "off",
        message: "Change postcode"
      });
    }
  };

  sendData = postcode => {
    this.props.parentCallback(postcode);
  };
  keyPressHandler = e => {
    if (e.keyCode == 13) {
      //console.log("value " + e.target.value);
      this.setState({
        location: e.target.value
      });
      this.sendData(e.target.value);
      e.target.value = "";
      this.inputElement.click();
    }
  };
  // closeInputField = e => {
  //   e.click();
  // };

  render() {
    return (
      <div className="location-container">
        {/**/}
        <div className="parent">
          <input
            className="cbox"
            type="checkbox"
            onClick={this.toggleInput}
            ref={input => (this.inputElement = input)}
          />
          <label className="add" htmlFor="cbox">
            {this.state.message}
          </label>
          <input
            className="location-input message"
            type="text-box"
            onKeyDown={this.keyPressHandler}
          ></input>
        </div>
        <i className="material-icons location-icon">my_location</i>
        <span className="location">{this.state.location}</span>
      </div>
    );
  }
}

export default Location;
