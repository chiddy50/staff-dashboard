export default {
  isLoggedIn() {
    // if(state.student_token === null && localStorage.getItem('auth') !== null) {
    //   var authValue = localStorage.getItem('auth');
    //   state.student_token = authValue;
    // }

    // var loggedIn = state.student_token !== null;
    // return loggedIn;

    return localStorage.getItem("auth_staff");
  },
};
