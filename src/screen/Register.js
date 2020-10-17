import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from '../style/RegisterStyle';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      ulangiPassword: '',
      cekPassword: true,
      ulangiCekPassword: true,
    };
  }

  register = () => {
    const {name, email, password, ulangiPassword} = this.state;

    //POST json
    var dataToSend = {
      name: name,
      email: email,
      password: password,
      password_confirmation: ulangiPassword,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('http://restful-api-laravel-7.herokuapp.com/api/register', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {token} = responseJson;
        if (token) {
          alert('register sukses');
          this.props.navigation.goBack();
        } else {
          alert('Pastikan Form Sudah Terisi dengan benar');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Pastikan Form Sudah Terisi dengan benar');
      });
  };

  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.signup}> Sign Up </Text>
        <Text style={styles.email}>Nama</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Masukan Nama anda...."
            onChangeText={(name) => this.setState({name})}
          />
        </View>
        <Text style={styles.email}>Email</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Masukan Email anda...."
            onChangeText={(email) => this.setState({email})}
          />
        </View>
        <Text style={styles.tpass}>Password</Text>
        <View style={styles.pass}>
          <TextInput
            placeholder="Masukan Password anda...."
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={this.state.cekPassword}
          />
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() =>
              this.setState({cekPassword: !this.state.cekPassword})
            }>
            <Image source={require('../logo/eye.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.tcpass}>Confirm Password</Text>
        <View style={styles.cpass}>
          <TextInput
            placeholder="Konfirmasi Password anda...."
            onChangeText={(ulangiPassword) => this.setState({ulangiPassword})}
            secureTextEntry={this.state.ulangiCekPassword}
          />
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() =>
              this.setState({ulangiCekPassword: !this.state.ulangiCekPassword})
            }>
            <Image source={require('../logo/eye.png')} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => this.register()} style={styles.daftar}>
          <Text style={styles.tdaftar}>Register</Text>
        </TouchableOpacity>
        <View style={styles.sig}>
          <Text style={styles.tsignin}>Have account?</Text>
          <Text
            style={styles.bsignin}
            onPress={() => this.props.navigation.goBack()}>
            Sign In
          </Text>
        </View>
      </View>
    );
  }
}
