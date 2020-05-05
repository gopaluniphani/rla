import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

import { Modal } from "react-bootstrap";

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

class AddStudents extends Component {
  state = {
    section: "",
    year: "",
    department: "",
    college_id: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addSection = (e) => {
    e.preventDefault();
    const { department, year, section } = this.state;
    this.props.addSection(this.props.lab_id, department, year, section);
    this.setState({ department: "", year: "", section: "" });
  };

  addStudent = (e) => {
    e.preventDefault();
    const { college_id } = this.state;
    this.props.addStudent(this.props.lab_id, college_id);
    this.setState({ college_id: "" });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Modal
          className={classes.modal}
          size="md"
          show={this.props.open}
          onHide={this.props.onClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Students to the lab
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className={classes.form}
              onSubmit={this.addSection}
              noValidate
            >
              <Grid container spacing={2} justify="flex-end">
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      name="department"
                      value={this.state.department}
                      onChange={this.onChange}
                    >
                      <MenuItem value="CSE">CSE</MenuItem>
                      <MenuItem value="IT">IT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Year</InputLabel>
                    <Select
                      name="year"
                      value={this.state.year}
                      onChange={this.onChange}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Section</InputLabel>
                    <Select
                      name="section"
                      value={this.state.section}
                      onChange={this.onChange}
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Section
                  </Button>
                </Grid>
              </Grid>
            </form>
            <hr />
            <form
              className={classes.form}
              onSubmit={this.addStudent}
              noValidate
            >
              <Grid
                container
                spacing={3}
                alignItems="center"
                justify="flex-end"
              >
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="College ID"
                    name="college_id"
                    value={this.state.college_id}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Student
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(connect(null, {})(AddStudents));
