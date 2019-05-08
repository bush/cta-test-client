import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewLottery.css";
import { API } from "aws-amplify";

export default class NewLottery extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return true;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await this.createLottery({
        description: "Just a test"
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  createLottery(lottery) {
    return API.post("lotteries", "/lotteries", {
      body: lottery,
      headers: { "x-app-token": "foobar" }
    });
  }

  render() {
    return (
      <div className="NewLottery">
        <form onSubmit={this.handleSubmit}>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Test"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
