import React from 'react';
import {Text, View, Image, Button} from 'react-native';
import {styles} from '../style/DrawerStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Dawer = () => {
  return (
    <View style={styles.background}>
      <Image style={styles.gambar} source={require('../logo/profile.png')} />
      <Text style={styles.nama}>Muhammad Mujahid Muslim</Text>
      <Text style={styles.username}>@Sanmu3</Text>
      <View style={styles.foll}>
        <Text style={styles.foll1}>0</Text>
        <Text style={styles.foll2}>Followers</Text>
        <Text style={styles.foll1}>0</Text>
        <Text style={styles.foll2}>Following</Text>
      </View>
    </View>
  );
};
export default Dawer;
