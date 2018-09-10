import { takeLatest, put, select, all } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import loginTypes from '../Types/login';
import loginActions from '../Actions/login';
import NavigatorService from '../../utilties/navigatorService';
import { validateLoginForm } from '../../utilties/validators';
import firebase from '../../utilties/firebase';

const { REQUEST_LOGIN } = loginTypes;
const { loginFailure, loginFormError, authSuccess } = loginActions;

const dataBase = firebase.database();
const Auth = firebase.auth();

const formSelector = (state) => state.auth;
export function* requestSigninSaga() {
  try {
    const { loginData } = yield select(formSelector);
    const errors = validateLoginForm(loginData)
    const { email, password } = errors;
    if (email.length > 0 || password.length > 0) {
      yield put(loginFormError({ email, password }));
      return;
    } else {
      const { email, password } = loginData;
      let isUsrCreated = false;
      yield Auth.createUserWithEmailAndPassword(email, password).then(() => { isUsrCreated = true });
      if (isUsrCreated === true) {
        let currentUser = yield Auth.signInWithEmailAndPassword(email, password);
        let { user } = currentUser;
        user = user.toJSON();
        yield dataBase.ref(`/users/${user.uid}`).set({ name: '', avatar: '', email, password, phone: '', friends: {}, id: user.uid });
        yield put(authSuccess({ name: '', email, password, id: user.uid }))
        yield AsyncStorage.setItem('user', JSON.stringify({ uid: user.uid, tokenManger: user.stsTokenManager }));
        yield NavigatorService.navigate('appTemp');
      }
    }

  } catch (error) {
    yield put(loginFailure(error.toString()));
  }
}

export default function* AuthSaga() {
  yield all([takeLatest(REQUEST_LOGIN, requestSigninSaga)]);
}
