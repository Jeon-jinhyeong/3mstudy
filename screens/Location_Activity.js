import React from 'react';

import { View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default class Location_Activity extends React.Component {

  static navigationOptions =
  {
     title: 'Location',
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { navigation } = this.props
    const kakao_ID = JSON.stringify(navigation.getParam('kakaoID', 'NO-User'));
    console.log(kakao_ID)
    return (

      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Latitude: {this.state.latitude} </Text>
        <Text>Longitude: {this.state.longitude} </Text>
        <Text>Longitude: {kakao_ID} </Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

      </View>

    );
  }
}