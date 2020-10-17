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
      this.setState({todos: [text, ...todos]});
    }
  }

  removeTodo(index) {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter((todo, id) => id != index),
    });
  }

  checklist = () => {
    this.setState({
      checklist: !this.state.checklist,
    });
  };
  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.bc} source={require('../logo/homehead.png')} />
        <Text style={styles.title}> My ToDo1 </Text>
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
