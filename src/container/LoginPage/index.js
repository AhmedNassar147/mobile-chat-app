import React, { Component } from 'react'
import { AsyncStorage, Animated } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginActions from '../../modules/Actions/login';
import { LoginForm } from '../../component';

const { loginFormChanged, requestLogin } = loginActions;
class LoginPage extends Component {
  constructor(props) {
    super(props)
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
    this.animatedVal = new Animated.Value(0)
  }

  animateTextLogo = () => {
    Animated.spring(this.animatedVal, {
      toValue: 1,
      duration: 2500,
      ease: 100
    }).start()
  }

  async componentWillMount() {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      this.props.navigation.navigate('appTemp')
    } else {
      this.animateTextLogo()
    }
  }


  render() {
    const { handleFormChange, fieldsErrors, requestLogin, submitting, authFormFailure } = this.props;

    const translateY = this.animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [-500, 1]
    })
    const transform = [{ translateY }]

    return (
      <LoginForm
        onClickedLogin={requestLogin}
        onFormChanged={handleFormChange}
        errors={fieldsErrors}
        submitting={submitting}
        formError={authFormFailure}
        transform={transform}
      />
    )
  }
}

LoginPage.propTypes = {
  handleFormChange: PropTypes.func,
  fieldsErrors: PropTypes.object,
  requestLogin: PropTypes.func,
  submitting: PropTypes.bool,
  authFormFailure: PropTypes.string

}

const mapStateToProps = state => {
  return {
    fieldsErrors: state.auth.loginFieldsErrors,
    submitting: state.auth.isSubmitting,
    authFormFailure: state.auth.authFormFailure,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFormChange: (inputName, inputValue) => dispatch(loginFormChanged({ inputName, inputValue })),
    requestLogin: isSubmitting => dispatch(requestLogin(isSubmitting)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);