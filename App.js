import React, {Component} from 'react';
import SplashScreen from './src/screen/SplashScreen';
import Navigation from './src/screen/Navigation';

export default class App extends Component {
  state = {
    splash: true,
  };

  splashScreen = () => {
    if (this.state.splash) {
      return <SplashScreen />;
    } else {
      return <Navigation />;
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({splash: false});
    }, 2000);
  }
  render() {
    return <>{this.splashScreen()}</>;
  }
}
