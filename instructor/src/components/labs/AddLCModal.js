import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Modal } from "react-bootstrap";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class AddLCModal extends Component {
  state = {
    name: "",
    description: "",
  };

  onChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onDescriptionChange = (evt, editor) => {
    this.setState({ description: editor.getData() });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addLabCycle(this.state.name, this.state.description);
    this.setState({ name: "", description: "" });
    this.props.onClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Modal
          className={classes.modal}
          size="lg"
          show={this.props.open}
          onHide={this.props.onClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a new Lab Cycle
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={classes.form} onSubmit={this.onSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                autoFocus
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <hr />
              <CKEditor
                editor={ClassicEditor}
                data={this.state.description}
                onChange={this.onDescriptionChange}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(AddLCModal);
