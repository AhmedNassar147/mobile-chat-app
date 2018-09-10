import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, Animated } from 'react-native';
import { Container, Form, Card, CardItem, View, Label, Item, Input } from 'native-base';
import AppGradient from '../AppGradient';

const LoadingError = ({ error }) => (
  <CardItem>
    <Item error>
      <Label style={{ color: 'red' }} children={error} />
    </Item>
  </CardItem>
);

const RenderInputGroup = ({ lable, handleChange, textContentType, secureTextEntry, error }) => (
  <Fragment>
    <CardItem>
      <Item floatingLabel>
        <Label children={lable} />
        <Input
          autoCorrect={false}
          onChangeText={handleChange}
          textContentType={textContentType}
          placeholderTextColor="#CE93D8"
          secureTextEntry={secureTextEntry ? true : false}
        />
      </Item>
    </CardItem>
    {error.length > 1 && <LoadingError error={error} />}
  </Fragment>
)

const LoginForm = ({ onFormChanged, onClickedLogin, errors, submitting, formError, transform }) => {
  const { container, footerStyle, footerTxt } = styles;
  const { email: emailError, password: passError } = errors;
  return (
    <Container>
      <AppGradient style={container}>
        <View style={{ marginBottom: 45 }}>
          <Animated.Text children="Chat" style={{ fontWeight: "bold", fontSize: 50, textAlign: 'center', transform }} />
        </View>

        <Form style={{ padding: 14, marginBottom: 45 }}>
          <Card style={{ borderRadius: 4 }}>

            <RenderInputGroup
              lable="Email"
              handleChange={email => onFormChanged('email', email)}
              textContentType="emailAddress"
              error={emailError}
            />

            <RenderInputGroup
              lable="Password"
              handleChange={password => onFormChanged('password', password)}
              textContentType="password"
              secureTextEntry
              error={passError}
            />

            {formError ? (<LoadingError error={formError} />) : null}

            <CardItem footer button activeOpacity={0.4} style={footerStyle} disabled={submitting} onPress={() => onClickedLogin(true)} >
              <Text style={footerTxt} children="Get Started" />
            </CardItem>

          </Card>
        </Form>

      </AppGradient>

    </Container>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  footerStyle: {
    backgroundColor: '#FFEB3B',
    marginTop: 15,
    paddingVertical: 10
  },
  footerTxt: {
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
  }
});

LoginForm.propTypes = {
  onClickedLogin: PropTypes.func,
  onFormChanged: PropTypes.func,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  formError: PropTypes.string,
  transform: PropTypes.array
}
export default LoginForm;

