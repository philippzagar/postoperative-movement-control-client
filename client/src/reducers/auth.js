export default (state = {}, action) => {
  switch (action.type) {
      case 'LOGIN':
      return {
          uid: action.uid,
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          access: action.access,
          token: action.token,
          auth: action.auth,
          loginTime: action.loginTime
      };
    case 'LOGOUT':
      return {
          uid: undefined,
          email: undefined,
          firstName: undefined,
          lastName: undefined,
          access: undefined,
          token: undefined,
          auth: undefined,
          loginTime: undefined
      };
    default:
      return state;
  }
};
