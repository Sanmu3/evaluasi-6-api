import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {styles} from '../style/TodoStyle';
import AsyncStorage from '@react-native-community/async-storage';
import {log} from 'react-native-reanimated';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      todos: [],
      loading: true,
      photo: '',
      task: '',
      desc: '',
      modal: false,
      checklist: false,
    };
  }

  addTodo() {
    const todo = {
      task: this.state.task,
      desc: this.state.desc,
      is_done: 0,
    };
    fetch('http://restful-api-laravel-7.herokuapp.com/api/todo', {
      method: 'POST',
      // body: this.createFormData(this.state.photo, todo),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('upload succes', response);
        alert('Upload success!');
      })
      .catch((error) => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  }

  // handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     if (response.uri) {
  //       this.setState({photo: response});
  //     }
  //   });
  // };

  // setLoading(loading) {
  //   this.setState({loading: loading});
  // }

  // createFormData = (photo, body) => {
  //   const data = new FormData();

  //   data.append('image', {
  //     name: photo.fileName,
  //     type: photo.type,
  //     uri:
  //       Platform.OS === 'android'
  //         ? photo.uri
  //         : photo.uri.replace('file://', ''),
  //   });

  //   Object.keys(body).forEach((key) => {
  //     data.append(key, body[key]);
  //   });

  //   console.log(data);
  //   return data;
  // };

  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          this.setState({token: token});
        } else {
          this.logOut();
        }
      })
      .then(() => this.getTodos());
    //setelah token muncul maka ambil data todo
  }

  checklist = () => {
    this.setState({
      checklist: !this.state.checklist,
    });
  };

  getTodos() {
    this.setLoading(true);
    console.log(this.state.token);
    fetch('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yZXN0ZnVsLWFwaS1sYXJhdmVsLTcuaGVyb2t1YXBwLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTYwMjkxNzA4MiwiZXhwIjoxNjAyOTIwNjgyLCJuYmYiOjE2MDI5MTcwODIsImp0aSI6IjdzSUZKVVZDZHowRngxUGoiLCJzdWIiOjQ4LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.HE1kdEtt4eG9RFxM9yxPGCk4sjXLiK-f0nJeby10Yo0',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const {status} = responseJson;
        if (status) {
          alert(status);
          this.logOut();
        } else {
          this.setState({todos: responseJson});
          console.log(responseJson);
          this.setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // checkTodo(id) {
  //   this.setLoading(true);

  //   //mengambil data dari state intuk difilter berdasarkan id
  //   const todo = this.state.todos.find((todo) => todo.id == id);

  //   //ganti kondisi todo
  //   todo.is_done = !todo.is_done;

  //   console.log(todo);

  //   //update todo berdasarkan data yg di update
  //   fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(todo),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       this.getTodos();
  //     });
  // }

  deleteTodo(id) {
    this.setLoading(true);
    fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const {status} = json;
        if (status == 'success') {
          this.getTodos();
        } else {
          alert('Gagal menghapus');
        }
      });
  }
  componentDidMount() {
    this.getToken();
  }

  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.bc} source={require('../logo/homehead.png')} />
        <Text style={styles.title}> My ToDo3 </Text>
        <View style={styles.ips}>
          <TextInput
            placeholder="Masukan Catatan Anda"
            onChangeText={(inputan) => this.setState({task: inputan})}
          />
          <TouchableOpacity onPress={() => this.addTodo()}>
            <Text style={styles.tad}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.todos.map((todo, index) => {
            console.log(this.state.todos);
            return (
              <View style={styles.data}>
                <Image
                  style={styles.icon}
                  source={require('../logo/edit.png')}
                />
                <View style={{marginHorizontal: 8, flex: 1}}>
                  <Text style={styles.fon}>{todo.task}</Text>
                  <Text style={styles.fon}>{todo.desc}</Text>
                </View>
                ;
                <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                  <Image
                    style={styles.icon}
                    source={require('../logo/trash.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.checklist()}>
                  {this.state.checklist ? (
                    <Image
                      style={styles.icon}
                      source={require('../logo/check.png')}
                    />
                  ) : (
                    <Image
                      style={styles.icon}
                      source={require('../logo/checkbox.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
