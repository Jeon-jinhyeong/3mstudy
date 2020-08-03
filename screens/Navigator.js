import React, { Component } from 'react'
import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
 
import Home_Activity from './Home_Activity';
// import Push_Activity from './Push_Activity';
import Location_Activity from './Location_Activity';
import WebView_Activity from './WebView_Activity';
import InAppPurcharse_Activity from './InAppPurcharse_Activity';
import Login from './Login'
// import Camera_Activity from './Camera_Activity';

const HomeTab = createStackNavigator(
  {
    Home: {screen : Home_Activity},
    Location: Location_Activity,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Home Tab',
     
    },
  }
);
 
const IAPTab = createStackNavigator(
  {
    IAP: InAppPurcharse_Activity
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#FFFFFF',
      title: 'Push Tab',
    },
  }
);

const LocationTab = createStackNavigator(
  {
    Home: { screen : Home_Activity},
    Location: {screen : Location_Activity},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Home Tab',
     
    },
  }
)

const CameraTab = createStackNavigator(
  {
    //Camera: Camera_Activity ,
    // Details: Details_Activity ,
    Home: Home_Activity,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Home Tab',
     
    },
  }
)

const WebViewTab = createStackNavigator(
  {
    Web_View: {screen : WebView_Activity},
    Login: {screen : Login}
  },
  {
    headerMode: 'none'
  }
)

const MainApp = createBottomTabNavigator(
  {
    Web_View: {screen : WebViewTab},
    Home: {screen : HomeTab},
    Location: {screen : LocationTab},
    IAP: {screen : IAPTab},
  },
  {
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);
 
 
export default createAppContainer(MainApp);