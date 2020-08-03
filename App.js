import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { inAppMessaging } from '@react-native-firebase/in-app-messaging';

import Navigator from './screens/Navigator';
import WebView_Activity from './screens/WebView_Activity'
import Login from './screens/Login'
import AuthLoading from './screens/AuthLoadingScreen'

// async function bootstrap() {
//   await inAppMessaging().setMessagesDisplaySuppressed(true);
// }
 
// async function onSetup(user) {
//   await setupUser(user);
//   // Allow user to receive messages now setup is complete
//   inAppMessaging().setMessagesDisplaySuppressed(false);
// }

const AppNavigator = createStackNavigator(
  {
      AuthLoading: {screen : AuthLoading},
      Login: {screen: Login},
      Web_View: {screen : WebView_Activity},
      // Navigator: {screen: Navigator},
  },
  {
      initialRouteName: 'AuthLoading',
      headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);