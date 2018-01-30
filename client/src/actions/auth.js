import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
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

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
