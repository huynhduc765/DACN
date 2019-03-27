import React, { Component } from 'react';
import {Keyboard, StyleSheet,View,Text,TextInput,Button ,Image,ImageBackground,Alert,AsyncStorage,Dimensions} from 'react-native';
import { createStackNavigator,StackActions,NavigationAction } from 'react-navigation';
import {ButtonGroup} from 'react-native-elements';
import MainScreen from './MainScreen'
import AppNavigator from '../navigation/AppNavigator';
import MainTabBar from './MainTabBar';
// import DangNhap from './DangNhap';
import DangKy from './DangKy';
// import test1 from './Test1'
import Swiper from 'react-native-swiper';
import FirstScreen from './FirstScreen';
import DangNhap from './DangNhap'
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';

//import User_AllRes from './UserComponents/User_AllRest';

export default class SwiperScreen extends Component {
  render(){
    const { navigation } = this.props;

    // const { navigate } = this.props.navigation;
    return (
      <Swiper style={styles.wrapper} 
        showsButtons={false} 
        loop={false}
        bounces={true}
        onChangeIndex={()=>{
            Keyboard.dismiss();
        }}
        >

        <View style={styles.slide1}>
          {/* <Text style={styles.text}>Hello Swiper</Text> */}
          <Image
            source={require("./IMG/scan-qr.jpg")}
            style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}
           />
        </View>

        <View style={styles.slide2}>
          {/* <Text style={styles.text}>Beautiful</Text> */}
          <Image
            source={require("./IMG/order_food_1.png")}
            style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}
           />
        </View>
        <ImageBackground 
            style={{flex:1,width:'100%',height:'100%'}}
            source={require("./IMG/background.jpg")}
         >  
        <View style={styles.slide3}>
       
               <GroupButtonClass navigation={navigation}/>
               
        </View>
        </ImageBackground>
      </Swiper>
    );
  }
}


class GroupButtonClass extends React.Component{
    // static navigationOptions = {
    //     title: 'Đăng Nhập',
    //     // header:null,
    //   };

      constructor () {
        super()
        this.state = {
          selectedIndex: 0,
        }
        this.updateIndex = this.updateIndex.bind(this)
      }
      updateIndex (selectedIndex) {
        this.setState({selectedIndex});
        console.log(selectedIndex);
      }
      




render() {
  const { navigation } = this.props;

  // const { navigate } = this.props.navigation;
// const DangNhap = ({navigation}) => (<DangNhap navigation={navigation}/>);
const component1 = () => <View><Text>Đăng nhập</Text></View>
const component2 = () => <View><Text>Đăng ký</Text></View>
//const component3 = () => <View><Text>Quên MK</Text></View>
const buttons = [{ element: component1 }, { element: component2 }/*, { element: component3 }*/]
const { selectedIndex } = this.state
var formHienThi;
if(selectedIndex === 0){
    formHienThi = <View style={{width:Dimensions.get('screen').width - 20,
                            height:Dimensions.get('screen').height,
                            marginTop:0,
                            }}>
         <DangNhap  navigation={navigation} />
          </View>
}
else if (selectedIndex === 1){
    formHienThi = 
            <View style={{width:Dimensions.get('screen').width - 20,height:Dimensions.get('screen').height}}> 
                 <DangKy navigation={navigation} /> 
             </View>
}
else{
    formHienThi = <View></View>
}
  return (
    <View style={styles1.container}>
         <View style={styles1.groupButton}>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 40}}
                selectedButtonStyle={{backgroundColor:'lightblue'}}
                selectedTextStyle={{color:'white'}}
                />
        </View>
        <View> 
            {formHienThi}
        </View>
    </View>
  );
  }};
  

const stylesDN = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,

    },
    form:{
        paddingTop:10
    },
    textInput:{
        borderWidth:0.3,
        fontSize:18, 
        padding:10,
        marginTop:10,
        color:'black',
    },
});

const styles1 = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
    },
    groupButton:{
        // color:'white',
        // flex:1,
        // backgroundColor:'red',
        height:50,
    }
    
});



const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
      marginTop:100,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})