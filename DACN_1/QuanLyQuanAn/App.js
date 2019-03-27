import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';
import FirstScreen from './screens/FirstScreen';
// import { createStackNavigator } from 'react-navigation';
import LoadingScreen from './screens/LoadingScreen'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
     component : <LoadingScreen/>
    }
   }
   componentDidMount(){
    this.timeoutHandle = setTimeout(()=>{
         this.setState({ component: <FirstScreen/> })
    }, 0);
    //3000
}

componentWillUnmount(){
  clearTimeout(this.timeoutHandle); 
}

        render() {
      return (
        this.state.component
);
      }
    } 
//   render(){
//     return(
//     // <FirstScreen/>
//     <LoadingScreen/>
//     );
//   }
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });