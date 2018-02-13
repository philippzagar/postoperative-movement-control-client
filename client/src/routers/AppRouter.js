import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Diagram from '../components/Diagram';
import Settings from '../components/Settings'
import NotFoundPage from '../components/NotFoundPage';
import LoginEmail from '../components/LoginEmail';
import ResetPassword from '../components/ResetPassword'
import EnterEmail from '../components/EnterEmail'
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import EnterPassword from "../components/EnterPassword";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <Route path="/loginEmail" component={LoginEmail} />
          <Route path="/resetpassword" component={EnterEmail}/>
          <Route path="/resetpasswordrequest/:key" component={EnterPassword}/>
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/diagram" component={Diagram}/>
          <PrivateRoute path="/settings" component={Settings}/>
          <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
