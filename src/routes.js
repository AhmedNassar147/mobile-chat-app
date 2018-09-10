import { createStackNavigator } from 'react-navigation';
import {
  LoginPage,
  AppTemplate,
  ChatRoomPage
} from './container';

const Routes = createStackNavigator({
  login: {
    screen: LoginPage,
    navigationOptions: {
      header: () => null,
    },
  },
  appTemp: {
    screen: AppTemplate,
    navigationOptions: {
      header: () => true,
    },
  },
  chatRoom: {
    screen: ChatRoomPage,
    navigationOptions: {
      header: () => true,
    },
  }
});

export default Routes;