import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Provider } from "react-redux";
import store from "../store";
import { loadInstructor } from "../actions/auth";

import PrivateRoute from "./common/PrivateRoute";
import Alerts from "./common/Alerts";

import Dashboard from "./labs/Dashboard";

import Login from "./accounts/Login";
import Register from "./accounts/Register";

const alertOptions = {
  timeout: 3000,
  offset: "50px",
  position: "bottom center",
};

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadInstructor());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/" component={Dashboard} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
