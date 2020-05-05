import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AddStudents from "./AddStudents";

import Student from "./Student";

import { displayMessage, displayErrors } from "../../actions/messages";

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  fab: {
    margin: theme.spacing(1),
    left: "auto",
  },
});

class StudentDetails extends Component {
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
      students: this.props.student_ids,
      open: false,
      config: config,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addSection = async (lab_id, department, year, section) => {
    try {
      const body = { department, year, section };
      const res = await axios.post(
        `/api/activelabs/section/${lab_id}`,
        body,
        this.state.config
      );
      if (res.data.length > 0) {
        console.log(res.data);
        this.setState({ students: [...this.state.students, ...res.data] });
        this.props.displayMessage({ section: "Added section successfully" });
      } else {
        this.props.displayMessage({
          nosection: "section already added to the lab",
        });
      }
    } catch (err) {
      this.props.displayErrors(err.response.data, err.response.status);
    }
  };

  addStudent = async (lab_id, college_id) => {
    try {
      const body = { college_id };
      const res = await axios.post(
        `/api/activelabs/student/${lab_id}`,
        body,
        this.state.config
      );
      if (!res.data.invalid) {
        this.setState({ students: [...this.state.students, res.data.id] });
        this.props.displayMessage({ student: "Added student successfully" });
      } else {
        this.props.displayMessage({
          nostudent: "student already added to the lab",
        });
      }
    } catch (err) {
      this.props.displayErrors(err.response.data, err.response.status);
    }
  };

  render() {
    const { classes } = this.props;
    const { students } = this.state;

    return (
      <Fragment>
        <Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Fab
                className={classes.fab}
                size="small"
                color="primary"
                aria-label="add"
                variant="extended"
                onClick={this.handleOpen}
              >
                <AddIcon className={classes.marginRight} />
                Add Students &nbsp;
              </Fab>
            </Grid>
          </Grid>
        </Fragment>
        <Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>College ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <Student
                    key={student}
                    lab_id={this.props.lab_id}
                    student_id={student}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
        <AddStudents
          lab_id={this.props.lab_id}
          open={this.state.open}
          onClose={this.handleClose}
          addSection={this.addSection}
          addStudent={this.addStudent}
        />
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(
  connect(null, { displayMessage, displayErrors })(StudentDetails)
);
