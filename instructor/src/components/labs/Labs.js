import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ActiveLabs from "./ActiveLabs";
import CompletedLabs from "./CompletedLabs";
import TabPanel from "../common/TabPanel";

import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing(1),
    left: "auto",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
});

class Labs extends Component {
  state = {
    value: 0,
  };

  handleChange = (e, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Link to="/addlab">
          <Fab
            className={classes.fab}
            size="small"
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <AddIcon className={classes.marginRight} />
            Add Labs &nbsp;
          </Fab>
        </Link>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              centered
              value={this.state.value}
              onChange={this.handleChange}
              variant="fullWidth"
            >
              <Tab label="Active Labs" />
              <Tab label="Completed Labs" />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <ActiveLabs />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <CompletedLabs />
          </TabPanel>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Labs);
