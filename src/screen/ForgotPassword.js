import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../style/ForgotStyle';

export default class ForgotPassword extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.title}> Reset Password </Text>
        <Text style={styles.sub}>
          Please enter your email below to receive your password reset
          instructions.
        </Text>
        <Text style={styles.email}>Email</Text>
        <View style={styles.input}>
          <TextInput placeholder="Masukan Email anda...." />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.daftar}>
          <Text style={styles.tdaftar}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.fot}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
