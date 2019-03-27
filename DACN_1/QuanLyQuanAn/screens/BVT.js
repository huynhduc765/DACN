import React from 'react';
import {
  Text,
  View,
  Modal,
  Easing,
  Animated ,AsyncStorage,Button,
  StyleSheet,
  
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Test from './Test';
import Test1 from './Test1';
import a from './a';
import b from './b';
import { ScrollView } from 'react-native-gesture-handler';
//import ChiTietQuanAn from './ChiTietQuanAn'
import NguoiDung_XemQuanAn from './NguoiDung_XemQuanAn';
class BVT extends React.Component{
    static navigationOptions = {
        // title: 'Home',
        header:null,
      };
      constructor(props){
          super(props);
          this.state={
              TenTaiKhoan:null
          }
      }
    

      _retrieveData () {
        AsyncStorage.getItem('TenTaiKhoan').then((value) => {
            if (value != null){
                setDefaultAccount(value);
                console.log("value of TTK " + DefaultAccount);
                AppNavigator.navigationOptions={
                    header:null,
                }
                this.props.navigation.navigate('AppNavigator');
            }
      });
    }
    
componentWillMount(){
    this._retrieveData();
    console.disableYellowBox = true;
}
      componentDidMount(){
        
      };



}
const RootStack = createStackNavigator(
    {
      Test:Test,
      Test1:Test1,
      BVT:BVT,
    },
    {
      initialRouteName: 'BVT',
      transitionConfig:()=>({
          transitionSpec:{
              duration:0,
              timing: Animated.timing,
          }
      })
    }
  );




export default class App extends React.Component {
  state = {
    modalVisible: false,
    animatedY: new Animated.Value(0)
  }


  openModal = () => {
    this.setState({ modalVisible: true }, this.openAnimation)
  }

  closeModal = () => {
    this.closeAnimation()
  }
  onPress1 = () => {
    this.props.navigation.navigate('Test');
   }
   
   onPress2 = () => {
    this.props.navigation.navigate('Test1');
   }
   
  openAnimation = () => {
    const { animatedY } = this.state

    Animated.timing(animatedY, {
      toValue: -100,
      duration: 250,
      easing: Easing.elastic(1.5)
    }).start()
  }

  closeAnimation = () => {
    const { animatedY } = this.state

    Animated.timing(animatedY, {
      toValue: 0,
      duration: 250,
      easing: Easing.bezier(0, -0.2, 0, -0.4)
    }).start(() => this.setState({ modalVisible: false }))
  }

  render() {
    const {
      container,
      textStyle,
      modalStyle,
      mainButtonStyle,
      littleButtonStyle
    } = styles

    const { modalVisible, animatedY } = this.state

    const phoneButtonStyle = [
      mainButtonStyle, littleButtonStyle, {
        backgroundColor: 'blue',
        transform: [{ translateY: Animated.multiply(2, animatedY) }]
      }
    ]

    const mapButtonStyle = [
      mainButtonStyle, littleButtonStyle, {
        backgroundColor: 'orange',
        transform: [{ translateY: Animated.multiply(1.5, animatedY) }]
      }
    ]

    const infoButtonStyle = [
      mainButtonStyle, littleButtonStyle, {
        backgroundColor: 'pink',
        transform: [{ translateY: animatedY }]
      }
    ]
      
      
    return (
      
      <View style={container}>
      
        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
        >
          <View style={modalStyle}>
            <Animated.View style={phoneButtonStyle}>
              <TouchableHighlight  onPress={this.onPress1}>
                <Text style={textStyle}>Phone</Text>
                 
              </TouchableHighlight>
            </Animated.View>

            <Animated.View style={mapButtonStyle}>
            <TouchableHighlight  onPress={this.onPress2}>
                <Text style={textStyle}>Maps</Text>
              </TouchableHighlight>
            </Animated.View>

            <Animated.View style={infoButtonStyle}>
              <TouchableHighlight>
                <Text style={textStyle}>Info</Text>
              </TouchableHighlight>
            </Animated.View>

            <TouchableHighlight
              style={mainButtonStyle}
              onPress={this.closeModal}
            >
              <Text style={textStyle}>Close</Text>
            </TouchableHighlight>
          </View>

        </Modal>
        <TouchableHighlight
          style={mainButtonStyle}
          onPress={this.openModal}
        >
          <Text style={textStyle}>Show</Text>
        </TouchableHighlight>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  mainButtonStyle: {
    right: 21,
    bottom: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  modalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  textStyle: {
    alignSelf: 'center'
  },
  littleButtonStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nut:{
    justifyContent:'center',
    backgroundColor:'green',
    flex:1,
    flexDirection:'column',

   
},
});