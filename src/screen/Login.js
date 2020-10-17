import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../style/LoginStyle';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    AsyncStorage.getItem('token').then((value) => {
      console.log(value);
      if (value !== null) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
    this.state = {
      secureTextEntry: true,
    };
  }

  mengambilUser = () => {
    fetch('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yZXN0ZnVsLWFwaS1sYXJhdmVsLTcuaGVyb2t1YXBwLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTYwMjkxNzA4MiwiZXhwIjoxNjAyOTIwNjgyLCJuYmYiOjE2MDI5MTcwODIsImp0aSI6IjdzSUZKVVZDZHowRngxUGoiLCJzdWIiOjQ4LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.HE1kdEtt4eG9RFxM9yxPGCk4sjXLiK-f0nJeby10Yo0',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.mengambilUser();
  }

  Login = () => {
    const {email, password} = this.state;

    var dataToSend = {email: email, password: password, mobile: true};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    //POST request
    fetch('http://restful-api-laravel-7.herokuapp.com/api/login', {
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
          AsyncStorage.setItem('token', token);
          this.props.navigation.navigate('Home');
        } else {
          alert('Pastikan Email dan Password BENAR!');
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        alert('Pastikan Email dan Password BENAR!');
      });
  };

  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.signin}> Sign In </Text>
        <Text style={styles.email}>Email</Text>
        <KeyboardAvoidingView>
          <View style={styles.input}>
            <TextInput
              placeholder="Masukan Email....."
              onChangeText={(email) => this.setState({email})}
            />
          </View>
        </KeyboardAvoidingView>
        <Text style={styles.pass}>Password</Text>
        <View style={styles.inputpass}>
          <TextInput
            secureTextEntry={this.state.secureTextEntry}
            placeholder="Masukan Password....."
            onChangeText={(password) => this.setState({password})}
          />
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() =>
              this.setState({secureTextEntry: !this.state.secureTextEntry})
            }>
            <Image source={require('../logo/eye.png')} />
          </TouchableOpacity>
        </View>
        <Text
          onPress={() => this.props.navigation.navigate('ForgotPassword')}
          style={styles.forgotpass}>
          Forgot Password ?
        </Text>
        <TouchableOpacity style={styles.login} onPress={() => this.Login()}>
          <Text style={styles.tlogin}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.or}>- OR -</Text>
        <View style={styles.icon}>
          <TouchableOpacity style={styles.fb}>
            <Image
              style={styles.lfb}
              source={require('../logo/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gg}>
            <Image style={styles.lgg} source={require('../logo/google.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.foot}>
          <Text style={styles.tsignup}>Don't have any account?</Text>
          <Text
            style={styles.bsignup}
            onPress={() => this.props.navigation.navigate('Register')}>
            Sign Up
          </Text>
        </View>
      </View>
    );
  }
}
