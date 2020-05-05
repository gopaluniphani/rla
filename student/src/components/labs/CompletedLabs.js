import React, { Component } from "react";
import { connect } from "react-redux";

import { loadCompletedLabs } from "../../actions/completedlabs";

import LabDetails from "./LabDetails";

import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

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
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class CompletedLabs extends Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.loadCompletedLabs(this.props.lab_ids);
    }
  }

  state = {
    expanded: false,
  };

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
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
    lab_ids: state.auth.student.completedLabs,
    labs: state.completedlabs.labs,
    isLoaded: state.completedlabs.isLoaded,
  };
};

export default withStyles(useStyles)(
  connect(mapStateToProps, { loadCompletedLabs })(CompletedLabs)
);
