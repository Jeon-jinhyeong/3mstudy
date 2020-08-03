import React from 'react';

import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default class Home_Activity extends React.Component {

  constructor(props) {  
    //constructor to set default state  
    super(props);  
    this.state = {  
        kakao_ID: 'asdasd',  
    };  
  }  

  static navigationOptions =
    {
      title: 'Home',
    };

  render() {
    const { navigate } = this.props.navigation

    console.log(this.state.kakao_ID)
    return (
      <View style={styles.MainContainer}>

        <Text style={{ marginTop: 40, fontSize: 20 }}>App Home Screen</Text>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Settings')}>

            <Text style={styles.text}>Go to settngs Tab</Text>

          </TouchableOpacity>

          <Button
            style={styles.button}
            onPress={() => navigate('Location', {kakao: this.state.kakao_ID},)}
            title="Go to Location Screen">

          </Button>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 11

  },

  button: {
    alignItems: 'center',
    backgroundColor: '#43A047',
    padding: 12,
    width: 280,
    marginTop: 12,
  },

  text: {

    color: '#fff'
  }

});