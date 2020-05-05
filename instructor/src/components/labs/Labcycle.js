import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Grid, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import axios from "axios";
import { displayMessage } from "../../actions/messages";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    textAlign: "left",
  },
  paperTools: {
    textAlign: "right",
  },
});

class Labcycle extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("instructor_token");
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
      edit: false,
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
    } catch (e) {
      console.log(e);
    }
  };

  editLabCycle = () => {
    this.setState({
      edit: true,
    });
  };

  saveLabCycle = async () => {
    this.setState({
      ...this.state,
      edit: false,
    });
    const body = JSON.stringify({
      lab_id: this.props.lab_id,
      labcycle_id: this.props.labcycle_id,
      name: this.state.name,
      description: this.state.description,
    });
    const res = await axios.post(
      `/api/activelabs/modify`,
      body,
      this.state.config
    );
    this.props.displayMessage(res.data);
  };

  onDescriptionChange = (e, editor) => {
    this.setState({
      ...this.state,
      description: editor.getData(),
    });
  };

  render() {
    const { classes } = this.props;

    const icons = !this.state.edit ? (
      <Paper elevation={0} className={classes.paperTools}>
        <Tooltip onClick={this.editLabCycle} title="Edit" placement="top">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          onClick={() => this.props.onDelete(this.props.labcycle_id)}
          title="Delete"
          placement="top"
        >
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    ) : (
      <Paper elevation={0} className={classes.paperTools}>
        <Tooltip onClick={this.saveLabCycle} title="Save" placement="top">
          <IconButton aria-label="edit">
            <DoneIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    );

    return (
      <div className={classes.root}>
        <Grid container spacing={0} alignItems="flex-end">
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h6">
                <strong>{this.state.name}</strong>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {icons}
          </Grid>
          <Grid item xs={12}>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.description}
              disabled={!this.state.edit}
              onChange={this.onDescriptionChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(
  connect(null, { displayMessage })(Labcycle)
);
