import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate = (prevProps) => {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.expired) alert.error(error.msg.expired);
      if (error.msg.msg) alert.error(error.msg.msg);
    }

    if (message !== prevProps.message) {
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.updated) alert.success(message.updated);
      if (message.added) alert.success(message.added);
      if (message.deleted) alert.success(message.deleted);
      if (message.created) alert.success(message.created);
      if (message.section) alert.success(message.section);
      if (message.nosection) alert.info(message.nosection);
      if (message.student) alert.success(message.student);
      if (message.nostudent) alert.info(message.nostudent);
      if (message.completed) alert.success(message.completed);
      if (message.changed) alert.success(message.changed);
    }
  };

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert(Alerts));
