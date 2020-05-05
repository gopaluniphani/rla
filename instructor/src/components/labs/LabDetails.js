import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import LabcycleDetails from "./LabcycleDetails";
import StudentDetails from "./StudentDetails";
import TabPanel from "../common/TabPanel";

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class LabDetails extends Component {
  state = {
    value: 0,
  };

  handleChange = (e, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            centered
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
          >
            <Tab label="Labcycles" />
            <Tab label="Students" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <LabcycleDetails
            lab_id={this.props.lab_id}
            labcycles={this.props.labcycles}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <StudentDetails
            lab_id={this.props.lab_id}
            student_ids={this.props.students}
          />
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(useStyles)(connect(null, {})(LabDetails));
