import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import HomePage from "./HomePage"
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Recorder from "./Recorder"
import Uploader from "./Uploader"
import AudioShowPage from "./AudioShowPage";
import UserProfile from "./UserProfile"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/uploads">
          <Uploader user={currentUser}/>
        </Route> 
        <AuthenticatedRoute exact path="/recordings" component={Recorder}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/profile">
          <UserProfile user={currentUser} />
        </Route> 
        <Route exact path="/audio/:id">
          <AudioShowPage user={currentUser} />
        </Route> 
        <Route exact path="/" component={HomePage}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
