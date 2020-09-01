import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import TermsOfService from "./Components/TermsOfService";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import HomePage from "./Pages/HomePage";
import ResetPwPage from "./Pages/ResetPwPage";
import PickNewPwPage from "./Pages/PickNewPwPage";
=======
import TermsOfService from "./Pages/TermsOfService";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import LoginPage from "./Pages/LoginPage";
import ResetPassword from "./Pages/ResetPassword";
>>>>>>> merging

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/TermsOfService" component={TermsOfService} />
          <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />
<<<<<<< HEAD
          <Route exact path="/ResetPwPage" component={ResetPwPage} />
          <Route exact path="/PickNewPwPage" component={PickNewPwPage} />
=======
          <Route exact path="/ResetPassword" component={ResetPassword} />
>>>>>>> merging
        </Switch>
      </Router>
    );
  }
}

export default Routes;
