import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
//import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      firebase.auth().currentUser.getIdToken(false).then((idToken) => {
          const firstLastName = user.displayName.split(" ");

          let instance = axios.create({
              baseURL: 'https://zagar.spdns.org/',
              timeout: 5000
          });

          instance.post("usersFirebase", {
              email: user.email,
              firstName: firstLastName[0],
              lastName: firstLastName[1],
              firebase: true,
              firebaseToken: idToken
          }).then((response) => {

              instance.post("users/loginFirebase", {
                  email: user.email,
                  password: idToken,
                  firebase: true
              }).then((response) => {
                  if (response.data["status"] === "OK") {
                      store.dispatch(login({
                          uid: user.uid,
                          email: user.email,
                          firstName: firstLastName[0],
                          lastName: firstLastName[1],
                          photoURL: user.photoURL,
                          access: "PATIENT",
                          token: response.headers["x-auth"],
                          auth: "firebase",
                          loginTime: moment()
                      }));
                      renderApp();
                      if (history.location.pathname === '/') {
                          history.push('/dashboard');
                      }
                  } else {
                      store.dispatch(logout());
                      renderApp();
                      history.push('/');
                  }
              }).catch((e) => {
                  store.dispatch(logout());
                  renderApp();
                  history.push('/');
              });
          }).catch((e) => {
              store.dispatch(logout());
              renderApp();
              history.push('/');
          });
      }).catch((e) => {
          store.dispatch(logout());
          renderApp();
          history.push('/');
      });
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    //history.push('/');
  }
});
