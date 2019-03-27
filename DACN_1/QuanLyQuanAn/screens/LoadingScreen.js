import React from 'react';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import FirstScreen from './FirstScreen';
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';


export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <LottieView source={require('../animation/QRanimation.json')} progress={this.state.progress} />
    );
  }
}



