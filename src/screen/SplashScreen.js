import React, {Component} from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import {styles} from '../style/SplashStyle';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.wp} source={require('../logo/wp.png')} />
        <Text style={styles.text}>Welcome,{'\n'}Please Wait for a second</Text>
        <ActivityIndicator style={styles.muter} size="large" color="white" />
      </View>
    );
  }
}
