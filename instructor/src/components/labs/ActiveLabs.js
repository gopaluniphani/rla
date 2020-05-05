import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { loadActiveLabs, markCompleted } from "../../actions/activelabs";

import LabDetails from "./LabDetails";

import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    flexBasis: "33.33%",
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  switch: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ActiveLabs extends Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.loadActiveLabs(this.props.lab_ids);
    }
  }

  state = {
    expanded: false,
    checked: false,
  };

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };

  toggleChecked = (evt) => {
    this.props.markCompleted(evt.target.id);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.labs.map((lab, index) => (
          <ExpansionPanel
            key={lab._id}
            expanded={this.state.expanded === `panel${index}`}
            onChange={this.handleChange(`panel${index}`)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{lab.code}</Typography>
              <Typography className={classes.secondaryHeading}>
                {lab.name}
              </Typography>
              <FormControlLabel
                className={classes.switch}
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                labelPlacement="start"
                control={
                  <Switch
                    id={lab._id}
                    color="primary"
                    size="small"
                    onChange={this.toggleChecked}
                  />
                }
                label="Completed"
              />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <LabDetails
                    lab_id={lab._id}
                    labcycles={lab.labcycles}
                    students={lab.students}
                  />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lab_ids: state.auth.instructor.activeLabs,
    labs: state.activelabs.labs,
    isLoaded: state.activelabs.isLoaded,
  };
};

export default withStyles(useStyles)(
  connect(mapStateToProps, { loadActiveLabs, markCompleted })(ActiveLabs)
);
