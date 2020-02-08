import React from 'react';
import Verify from './components/VerifyComponent';
import Interest from './components/InterestsComponent';
import Welcome from './components/WelcomeComponent';
import Login from './components/LoginComponent';
import SignUp from './components/SignupComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="h-50 text-center" style={{'fontSize':'56px','position':'relative','margin-top':"10%"}}>Vayuz</div>
      <Router>
     <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/Verify">
            <Verify />
          </Route>
          <Route exact path="/interest">
            <Interest />
          </Route>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
