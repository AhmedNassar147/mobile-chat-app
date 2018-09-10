import loginTypes from '../Types/login';

const {
  LOGIN_FAILURE,
  LOGIN_FIELDS_ERRORS,
  LOGIN_FORM_CHANGED,
  REQUEST_LOGIN,
  ON_AUTH_SUCCESS
} = loginTypes;

export default {
  loginFormChanged: ({ inputName, inputValue }) => ({
    type: LOGIN_FORM_CHANGED,
    inputName,
    inputValue
  }),

  requestLogin: isSubmitting => ({ type: REQUEST_LOGIN, isSubmitting }),
  authSuccess: currentUser => ({ type: ON_AUTH_SUCCESS, currentUser }),

  loginFormError: loginFieldsErrors => ({ type: LOGIN_FIELDS_ERRORS, loginFieldsErrors }),
  loginFailure: error => ({ type: LOGIN_FAILURE, error }),
}