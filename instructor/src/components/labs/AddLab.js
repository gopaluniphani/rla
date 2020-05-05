import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getLabs, addActiveLab } from "../../actions/labs";
import CreateLab from "./CreateLab";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  fab: {
    margin: theme.spacing(1),
    left: "auto",
  },
});

class AddLab extends Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.getLabs();
    }
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addActiveLab = (lab_id) => {
    this.props.addActiveLab(lab_id);
  };

  render() {
    const { classes, labs } = this.props;
    return (
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
              <AddIcon />
              Create New Lab &nbsp;
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labs.map((lab) => (
                    <TableRow key={lab._id}>
                      <TableCell component="th" scope="row">
                        {lab.code}
                      </TableCell>
                      <TableCell align="center">{lab.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => this.addActiveLab(lab._id)}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <CreateLab open={this.state.open} onClose={this.handleClose} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  labs: state.labs.labs,
  isLoaded: state.labs.isLoaded,
});

export default withStyles(useStyles)(
  connect(mapStateToProps, { getLabs, addActiveLab })(AddLab)
);
