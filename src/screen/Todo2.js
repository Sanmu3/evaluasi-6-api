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

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      todos: ['mujahid', 'Sanmu'],
      text: '',
      checklist: false,
    };
  }

  addTodo() {
    const {text, todos} = this.state;
    if (text == '') {
      alert('Isi dulu lah');
    } else {
      this.setState({todos: [text, ...todos]}, function () {
        this.saveData();
      });
    }
  }

  removeTodo(index) {
    const {todos} = this.state;
    this.setState(
      {
        todos: todos.filter((todo, id) => id !== index),
      },
      function () {
        this.saveData();
      },
    );
  }
  checklist = () => {
    this.setState({
      checklist: !this.state.checklist,
    });
  };

  saveData() {
    AsyncStorage.setItem(
      'todos',
      JSON.stringify(this.state.todos),
    ).catch((err) => console.log(err));
  }

  componentDidMount() {
    AsyncStorage.getItem('todos')
      .then((response) => {
        if (response) {
          console.log(response);
          let todos = JSON.parse(response);
          this.setState({todos: todos});
        } else {
          console.log(response);
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.bc} source={require('../logo/homehead.png')} />
        <Text style={styles.title}> My ToDo2 </Text>
        <View style={styles.ips}>
          <TextInput
            placeholder="Masukan Catatan Anda"
            onChangeText={(inputan) => this.setState({text: inputan})}
          />
          <TouchableOpacity onPress={() => this.addTodo()}>
            <Text style={styles.tad}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.todos.map((value, index) => {
            return (
              <View style={styles.data}>
                <Image
                  style={styles.icon}
                  source={require('../logo/edit.png')}
                />
                <Text style={styles.fon}>{value}</Text>
                <TouchableOpacity onPress={() => this.removeTodo(index)}>
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
