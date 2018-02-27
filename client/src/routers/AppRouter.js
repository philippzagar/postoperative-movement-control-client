import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Diagram from '../components/Diagram';
import Settings from '../components/Settings'
import NotFoundPage from '../components/NotFoundPage';
import RegisterWithEmailAndPassword from '../components/RegisterWithEmailAndPassword';
import ResetPasswordEnterEmail from '../components/ResetPasswordEnterEmail'
import ResetPasswordEnterPassword from "../components/ResetPasswordEnterPassword";
import LoginEmailPassword from "../components/LoginEmailPassword";
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <Route path="/register" component={RegisterWithEmailAndPassword} />
          <Route path="/loginemailpassword" component={LoginEmailPassword}/>
          <Route path="/resetpassword" component={ResetPasswordEnterEmail}/>
          <Route path="/resetpasswordrequest/:key" component={ResetPasswordEnterPassword}/>
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/diagram" component={Diagram}/>
          <PrivateRoute path="/settings" component={Settings}/>
          <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
