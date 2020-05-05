import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Modal } from "react-bootstrap";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { createLab, addLabcycle } from "../../actions/labs";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class CreateLab extends Component {
  state = {
    code: "",
    name: "",
    lc_name: "",
    description: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDescriptionChange = (evt, editor) => {
    this.setState({ description: editor.getData() });
  };

  createLab = (e) => {
    e.preventDefault();
    this.props.createLab(this.state.code, this.state.name);
    this.setState({ code: "", name: "" });
  };

  addLabcycle = (e) => {
    e.preventDefault();
    const { lc_name, description } = this.state;
    this.props.addLabcycle(lc_name, description, this.props.id);
    this.setState({ lc_name: "", description: "" });
  };

  toggleCLC() {
    this.props.lc_added = false;
  }

  render() {
    const { classes } = this.props;

    const create_lab = (
      <form className={classes.form} onSubmit={this.createLab} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Code"
              name="code"
              value={this.state.code}
              onChange={this.onChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
      </form>
    );

    const add_labcycle = (
      <form className={classes.form} onSubmit={this.addLabcycle} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              autoFocus
              name="lc_name"
              value={this.state.lc_name}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Labcycle
            </Button>
          </Grid>
        </Grid>
      </form>
    );

    return (
      <Fragment>
        <Modal
          className={classes.modal}
          show={this.props.open}
          onHide={this.props.onClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a new Lab
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!this.props.lab_created ? create_lab : add_labcycle}
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.labs.newlab,
  lab_created: state.labs.isCreated,
  lc_added: state.labs.isAdded,
});

export default withStyles(useStyles)(
  connect(mapStateToProps, { createLab, addLabcycle })(CreateLab)
);
