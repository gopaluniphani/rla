import React, { Component, Fragment } from "react";

import LabcycleDetails from "./LabcycleDetails";

class LabDetails extends Component {
  render() {
    return (
      <LabcycleDetails
        lab_id={this.props.lab_id}
        labcycles={this.props.labcycles}
      />
    );
  }
}

export default LabDetails;
