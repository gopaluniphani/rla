import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class Student extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("instructor_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }

    this.state = {
      college_id: "",
      first_name: "",
      config: config,
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get(
        `/api/student/${this.props.student_id}`,
        this.state.config
      );
      const { college_id, first_name } = res.data;
      this.setState({ college_id: college_id, first_name: first_name });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { college_id, first_name } = this.state;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {college_id}
        </TableCell>
        <TableCell>{first_name}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="primary">
            Status
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default connect(null, {})(Student);
