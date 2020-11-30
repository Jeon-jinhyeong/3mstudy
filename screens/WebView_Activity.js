import React, {Component, useState, useEffect} from 'react';
import { Alert, Linking, StyleSheet, Text, View, AppRegistry, BackHandler, ToastAndroid, YellowBox } from 'react-native';
import { WebView } from 'react-native-webview';
import utf8 from 'utf8';
import base64 from 'base-64';
import CookieManager from 'react-native-cookies';
import { Buffer } from 'buffer';
import { createAppContainer } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';
import RNBootSplash from 'react-native-bootsplash'
import OneSignal from 'react-native-onesignal'
import SendIntentAndroid from 'react-native-send-intent'

import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

// var text = utf8.encode("m_id=1241927064")
// // let login_web = base64.encode("m_id=" + text)
// let login_web = new Buffer(text).toString('base64');

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8640206644623436/7250350542';

export default class WebView_Activity extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      asd: '',
      loaded: false,
      setLoaded: false,

    };
    OneSignal.init("6b0ab107-e44f-44d2-9742-4b81f7413fff");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  showInterstitialAd = () => {
    // Create a new instance
    // const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4577801432842517/8464621950';

    const interstitialAd = InterstitialAd.createForAdRequest(adUnitId);
    // Add event handlers
    interstitialAd.onAdEvent((type, error) => {
        if (type === AdEventType.LOADED) {
            interstitialAd.show();
        }
    });

    // Load a new advert
    interstitialAd.load();
  }

  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    } else {
       BackHandler.exitApp();  // 앱 종료
       return false;
    }
  }

  // 이벤트 등록
  componentDidMount() {

    //this.showInterstitialAd();
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }

    // const unitId = 'ca-app-pub-8640206644623436/7250350542';
    // const advert = firebase.admob().interstitial(unitId);
    // const AdRequest = firebase.admob.AdRequest;
    // const request = new AdRequest();
    // // request.addKeyword('foo').addKeyword('bar');
    // advert.loadAd(request.build());

    // advert.on('onAdLoaded', () => {
    //   console.log('Advert ready to show.');
    // });

    // setTimeout(() => {
    //   if (advert.isLoaded()) {
    //     advert.show();
    //   } else {
    //     // Unable to show interstitial - not loaded yet.
    //   }
    // }, 1000);

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  // 이벤트 해제
  componentWillUnmount() {
      // this.exitApp = false;
      // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);

      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', this.onAndroidBackPress);
      }
  }

  // 이벤트 동작
  // handleBackButton = () => {
  //   // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
  //   if (this.exitApp == undefined || !this.exitApp) {
  //       ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
  //       this.exitApp = true;

  //       this.timeout = setTimeout(
  //           () => {
  //               this.exitApp = false;
  //           },
  //           2000    // 2초
  //       );
  //   } else {
  //       clearTimeout(this.timeout);

  //       BackHandler.exitApp();  // 앱 종료
  //   }
  //   return true;
  // }

  render() {
    const urI = 'http://3mstudy.kr/app/index.php?device=mobile'
    const { navigation } = this.props;
    const kakaoID = navigation.getParam('kakaoID', 'NO-User');
    console.log(kakaoID)
    const injectedJavascript = `(function() {
          window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`

    // const Banner = firebase.admob.Banner;
    // const AdRequest = firebase.admob.AdRequest;
    // const request = new AdRequest();
    // request.addKeyword('foobar');

    // const unitId = 'ca-app-pub-8640206644623436/6595265495';

    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          ref = { webView => {this.webView.ref = webView; }}
	        onNavigationStateChange={(navState) => {
            console.log(navState.url.slice(0,6)) 
            if (navState.url.slice(0,6) == 'intent') {
              // this.webView.ref.stopLoading();
              SendIntentAndroid.openAppWithUri(navState.url);
              // Linking.sendIntent(navState.url);
            } else {
              this.webView.canGoBack = navState.canGoBack;
            }
          }}
          injectedJavaScript={injectedJavascript}
          onMessage={this._onMessage}
          source={{
            uri: urI,
            method: 'POST',
            body: `${kakaoID}`,

          }}
          bounces={false}
          allowFileAccess={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          geolocationEnabled={true}
          saveFormDataDisabled={true}
          allowFileAccessFromFileURLS={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist = {'http://*', 'https://*', 'intent://*', "sms://*", "file://*"}
	        cacheEnabled={false}
	        ignoreSslError={true}
          javaScriptEnabled={true}
          useWebKit={true}
          onLoadEnd= {() => {
            console.log('LOAD END!!');
          }}
          onError = {(err) => {
            console.log('ERROR', err);
          }}
        />
      </View>
    );
  }

  _onMessage = (e) => {
    console.log("asd")
    Alert.alert(e.nativeEvent.data)
    console.log(e.nativeEvent.data)
    this.webView.ref.postMessage("리액트에서 보내는 메세지입니다.")
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  webview: {
      flex: 1
  }
});

YellowBox.ignoreWarnings(['source.uri']);
