import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Dawer from './Drawer';
import Todo1 from './Todo1';
import Todo2 from './Todo2';
import Todo3 from './Todo3';
import Profile from './Profile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const IconBottom = (props) => {
  const {color, focused} = props.data;
  let colorSelected = focused ? color : 'grey';
  return (
    <View>
      <Image
        source={props.image}
        style={{width: 30, height: 30, tintColor: colorSelected}}
      />
    </View>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../logo/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Todo1"
        component={Todo1}
        options={{
          title: 'ToDo1',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../logo/todo1.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Todo2"
        component={Todo2}
        options={{
          title: 'ToDo2',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../logo/todo2.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Todo3"
        component={Todo3}
        options={{
          title: 'ToDo3',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../logo/todo3.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('../logo/todo1.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Draw = () => {
  return (
    <Drawer.Navigator drawerContent={() => <Dawer />}>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Logout" component={Login} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Draw}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
