import React, {Component} from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import {styles} from '../style/HomeStyle';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.bc} source={require('../logo/homehead.png')} />
        <Text style={styles.title}> Welcome to My ToDo </Text>
        <Text style={styles.keterangan}>
          aplikasi ini masih dalam pengembangan
        </Text>
      </View>
    );
  }
}
