import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';

export const styles = StyleSheet.create({
  bc: {
    position: 'absolute',
  },
  background: {
    flex: 1,
    backgroundColor: '#0292b1',
    alignItems: 'center',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: 25,
    borderBottomWidth: 3,
  },
  ips: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginTop: 175,
    width: 325,
  },
  tad: {
    marginRight: 30,
  },
  data: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'space-around',
    borderRadius: 20,
    height: 36,
    alignItems: 'center',
    width: 300,
  },
  fon: {
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
