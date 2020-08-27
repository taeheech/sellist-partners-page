import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TermsOfService from "./Pages/TermsOfService";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import LoginPage from "./Pages/LoginPage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/TermsOfService" component={TermsOfService} />
          <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
