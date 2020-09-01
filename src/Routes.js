import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TermsOfService from "./Pages/TermsOfService";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import LoginPage from "./Pages/LoginPage";
import ResetPassword from "./Pages/ResetPassword";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/TermsOfService" component={TermsOfService} />
          <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
