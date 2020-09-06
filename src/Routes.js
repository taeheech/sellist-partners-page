import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TermsOfService from "./Components/TermsOfService";
import PrivacyPolicy from "./Components/PrivacyPolicy";

import HomePage from "./Pages/HomePage";
import ResetPwPage from "./Pages/ResetPwPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/TermsOfService" component={TermsOfService} />
          <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />
          <Route exact path="/ResetPwPage" component={ResetPwPage} />
          <Route
            exact
            path="/ForgotPasswordPage"
            component={ForgotPasswordPage}
          />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
