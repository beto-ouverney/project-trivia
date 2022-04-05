import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Ranking from '../Pages/Ranking';
import Settings from '../Pages/Settings';
import TriviaGame from '../Pages/TriviaGame';
import Feedback from '../Pages/Feedback';
import NotFound from '../Pages/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/settings" component={ Settings } />
    <Route exact path="/ranking" component={ Ranking } />
    <Route exact path="/triviagame" component={ TriviaGame } />
    <Route exact path="/feedback" component={ Feedback } />
    <Route path="*" component={ NotFound } />
  </Switch>
);

export default Routes;
