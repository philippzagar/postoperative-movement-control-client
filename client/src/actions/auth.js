import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const login = ({uid, email, firstName, lastName, access, token, auth, loginTime}) => ({
    type: 'LOGIN',
    uid,
    email,
    firstName,
    lastName,
    access,
    token,
    auth,
    loginTime
});

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithRedirect(googleAuthProvider);
  };
};

export const startFacebookLogin = () => {
    return () => {
        return firebase.auth().signInWithRedirect(facebookAuthProvider);
    };
};

export const startEmailLogin = (email, password) => {
    return () => {
        firebase.auth().createUserWithEmailAndPassword(email, password);
    }
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
      return firebase.auth().signOut();
  };
};
