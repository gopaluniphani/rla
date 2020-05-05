import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Labcycle from "./Labcycle";

import { displayMessage } from "../../actions/messages";

class LabcycleDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labcycles: this.props.labcycles,
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
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
    );
  }
}

export default connect(null, { displayMessage })(LabcycleDetails);
