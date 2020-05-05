import axios from "axios";

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Labcycle from "./Labcycle";
import AddLCModal from "./AddLCModal";

import { displayMessage } from "../../actions/messages";

const useStyles = (theme) => ({
  fab: {
    margin: theme.spacing(1),
    left: "auto",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
});

class LabcycleDetails extends Component {
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
      labcycles: this.props.labcycles,
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

  addLabCycle = async (name, description) => {
    const body = JSON.stringify({
      lab_id: this.props.lab_id,
      labcycle: { name, description },
    });
    const res = await axios.post(
      "./api/activelabs/add",
      body,
      this.state.config
    );
    const labcycle = res.data._id;
    this.setState({ labcycles: [...this.state.labcycles, labcycle] });
    this.props.displayMessage({ added: "labcycle added successfully" });
  };

  onDelete = async (labcycle_id) => {
    const body = JSON.stringify({
      lab_id: this.props.lab_id,
      labcycle_id: labcycle_id,
    });
    const res = await axios.post(
      "/api/activelabs/delete",
      body,
      this.state.config
    );
    const l = this.state.labcycles.filter(
      (labcycle) => labcycle !== labcycle_id
    );
    this.setState({ labcycles: l });
    this.props.displayMessage(res.data);
  };

  render() {
    const { classes } = this.props;

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
                Add Labcycle &nbsp;
              </Fab>
            </Grid>
          </Grid>
        </Fragment>
        <Fragment>
          {this.state.labcycles.map((labcycle) => (
            <Labcycle
              key={labcycle}
              lab_id={this.props.lab_id}
              labcycle_id={labcycle}
              onDelete={this.onDelete}
            />
          ))}
        </Fragment>
        <AddLCModal
          open={this.state.open}
          onClose={this.handleClose}
          addLabCycle={(name, description) =>
            this.addLabCycle(name, description)
          }
        />
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(
  connect(null, { displayMessage })(LabcycleDetails)
);
