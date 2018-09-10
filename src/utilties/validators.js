export const validateLoginForm = ({ email, password }) => {
  const regsExForEmail = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email);
  let loginFormErrors = {};
  if (!email || !regsExForEmail) {
    loginFormErrors.email = 'invalid email';
  } else {
    loginFormErrors.email = '';
  }
  if (!password) {
    loginFormErrors.password = 'Password is Required';
  } else if (password.length < 6) {
    loginFormErrors.password = 'Password length should more than 5';
  } else {
    loginFormErrors.password = '';
  }
  return loginFormErrors;
}