import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";

import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { changePassword } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Settings extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      this.props.changePassword(oldPassword, newPassword);
      this.setState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { oldPassword, newPassword, confirmPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Current Password"
                  name="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
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
              Update
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(
  connect(null, { changePassword, createMessage })(Settings)
);
