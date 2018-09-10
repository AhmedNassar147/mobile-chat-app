import React, { Component } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { Font, AppLoading } from "expo";
import { Root } from 'native-base';
import RoutingScreens from './routes';
import NavigatorService from './utilties/navigatorService';
import { theme } from './globals';

class AppContainer extends Component {
  state = {
    appLoading: true
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      FontAwesome: require('native-base/Fonts/FontAwesome.ttf'),
      Entypo: require('native-base/Fonts/Entypo.ttf'),
      MaterialIcons: require('native-base/Fonts/MaterialIcons.ttf'),
    }).then(() => this.setState({ appLoading: false }));
  }


  render() {
    const { appLoading } = this.state;
    if (appLoading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <Root style={{ flex: 1, height: '100%', backgroundColor: theme.purple }}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={{ height: 24, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
        <RoutingScreens
          ref={navigatorRef => { NavigatorService.setContainer(navigatorRef) }}
        />
      </Root>
    );
  }
}
export default AppContainer;
