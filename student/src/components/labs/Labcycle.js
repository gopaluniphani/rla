import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Grid, Paper } from "@material-ui/core";

import axios from "axios";
import { displayErrors } from "../../actions/messages";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    textAlign: "left",
  },
});

class Labcycle extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("student_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }

    this.state = {
      name: "",
      description: "",
      config: config,
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get(
        `/api/activelabs/labcycle/${this.props.labcycle_id}`,
        this.state.config
      );
      const { name, description } = res.data;
      this.setState({ name: name, description: description });
    } catch (err) {
      this.props.displayErrors(err.response.data, err.response.status);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} alignItems="flex-end">
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h6">
                <strong>{this.state.name}</strong>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [],
              }}
              data={this.state.description}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(
  connect(null, { displayErrors })(Labcycle)
);
