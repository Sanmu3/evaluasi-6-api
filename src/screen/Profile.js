import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import {styles} from '../style/ProfileStyle';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.bc} source={require('../logo/homehead.png')} />
        <Text style={styles.title}> Profile </Text>
        <Image style={styles.poto} source={require('../logo/profile.png')} />
        <Text style={styles.nama}>Muhammad Mujahid Muslim</Text>
        <Text style={styles.email}>Email</Text>
        <View style={styles.email1}>
          <Text style={styles.email2}>mujahidmuslim0@gmail.com</Text>
        </View>
        <Text style={styles.hp}>Number Phone</Text>
        <View style={styles.hp1}>
          <Text style={styles.hp2}>0838 7346 3780</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.log}>
          <TouchableOpacity onPress={this.clearAsyncStorage}>
            <Text style={styles.log2}>Logout</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}
