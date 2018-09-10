import loginTypes from '../Types/login';
const {
  LOGIN_FIELDS_ERRORS,
  LOGIN_FORM_CHANGED,
  LOGIN_FAILURE,
  REQUEST_LOGIN,
  ON_AUTH_SUCCESS
} = loginTypes;

const initialState = {
  loginData: {},
  loginFieldsErrors: { email: '', password: '' },
  authFormFailure: "",
  isSubmitting: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_CHANGED:
      return {
        ...state,
        loginData: {
          ...state.loginData,
          [action.inputName]: action.inputValue,
        },
        loginFieldsErrors: { email: '', password: '' },
        isSubmitting: false,
        authFormFailure: ''
      }
    case LOGIN_FIELDS_ERRORS:
      return {
        ...state,
        loginFieldsErrors: action.loginFieldsErrors,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        authFormFailure: action.error,
      }
    case REQUEST_LOGIN:
      return {
        ...state,
        isSubmitting: action.isSubmitting
      }
    case ON_AUTH_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser
      }

    default:
      return state;
  }
};