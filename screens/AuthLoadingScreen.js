import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  YellowBox,
  Image,
  ImageBackground,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNBootSplash from 'react-native-bootsplash'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount() {
    RNBootSplash.hide({ duration: 1 });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userId = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    if (userId == null) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('Web_View', { kakaoID: `${userId}` });
    }
  };

  // Render any loading content that you like here
  render() {
    return (
        <View>

        </View>
    );
  }
}

YellowBox.ignoreWarnings(['source.uri']);
