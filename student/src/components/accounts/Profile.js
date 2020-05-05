import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";

import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { update } from "../../actions/auth";

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

class Profile extends Component {
  state = {
    college_id: this.props.college_id,
    email: this.props.email,
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    department: this.props.department,
    year: this.props.year,
    section: this.props.section,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      college_id,
      email,
      first_name,
      last_name,
      department,
      year,
      section,
    } = this.state;
    const student = {
      college_id,
      email,
      first_name,
      last_name,
      department,
      year,
      section,
    };
    this.props.update(student);
  };

  render() {
    const { classes } = this.props;
    const {
      college_id,
      email,
      first_name,
      last_name,
      department,
      year,
      section,
    } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={first_name}
                  onChange={this.onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  value={last_name}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="College ID"
                  name="college_id"
                  value={college_id}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Department"
                  name="department"
                  value={department}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Year"
                  name="year"
                  value={year}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Section"
                  name="section"
                  value={section}
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

const mapStateToProps = (state) => ({
  college_id: state.auth.student.college_id,
  email: state.auth.student.email,
  first_name: state.auth.student.first_name,
  last_name: state.auth.student.last_name,
  department: state.auth.student.department,
  year: state.auth.student.year,
  section: state.auth.student.section,
});

export default withStyles(useStyles)(
  connect(mapStateToProps, { update })(Profile)
);
