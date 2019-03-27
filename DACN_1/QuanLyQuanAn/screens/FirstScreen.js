import React from 'react'
import {View,StyleSheet,Button,AsyncStorage,Animated} from 'react-native';
// import AppNavigator from './navigation/AppNavigator';
import AppNavigator from '../navigation/AppNavigator';
import { createStackNavigator } from 'react-navigation';

import DangKy from './DangKy';
import DangNhap from './DangNhap';
import Test from './Test';
import Test1 from './Test1';
import Test2 from './Test2';
import SettingScreen from './SettingsScreen';
import MainTabBar from './MainTabBar';
import QuanLyQuanAn from './QuanLyQuanAn';
import TaoQuanAn from './TaoQuanAn';
import ChiTietQuanAn from './ChiTietQuanAn';
import ThemMonAn from './ThemMonAn';
import ThemLoaiMonAn from './ThemLoaiMonAn';
import SwiperScreen from './SwiperScreen';
import ChiTietMonAn from './ChiTietMonAn';
import ChonLoaiMonAn from './ChonLoaiMonAn';
import ChuQuanXemOrder from './ChuQuanXemOrder';
import TaoQRCode from './TaoQRCode';
import NguoiDung_XemQuanAn from './NguoiDung_XemQuanAn';
import NguoiDung_MenuChinh from './NguoiDung_MenuChinh';
import ChuQuan_YeuCauTinhTien from './ChuQuan_YeuCauTinhTien'
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';
import BVT from './BVT';
import a from './a';
import b from './b';
import User_AllRest from './UserComponents/User_AllRest';

class FirstScreen extends React.Component{
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

DangNhap(){
    this.props.navigation.navigate('DangNhap');
}
DangKy(){
    this.props.navigation.navigate('DangKy');
}
Skip(){
    // Navigator.navi
    AppNavigator.navigationOptions={
        header:null,
    }
    this.props.navigation.navigate('AppNavigator');
}
Test(){
    this.props.navigation.navigate('Test');
}
Test1(){
    this.props.navigation.navigate('Test1');
}

Test2(){
    this.props.navigation.navigate('Test2');
}

BVT(){
    this.props.navigation.navigate('BVT');
}
a(){
    this.props.navigation.navigate('a');
}b(){
    this.props.navigation.navigate('b');
}

User_AllRest(){
    this.props.navigation.navigate('User_AllRest');
}


render(){  
    const { navigation } = this.props;
  
    return(
        <SwiperScreen navigation={navigation}/>
       /*   <View style={styles.container}>
             <View styles={styles.nut}>  
                 <Button onPress={() => this.DangNhap()} title="Đăng Nhập"/> 
                 <Button onPress={()=> this.DangKy()} title="Đăng Ký"/>
                 <Button onPress={()=> this.Skip()} title="Skip"/>
                 <Button onPress={()=> this.Test()} title="Test"/>
                 <Button onPress={()=> this.Test1()} title="Test1"/>
                 <Button onPress={()=> this.Test2()} title="Test2"/>
                 <Button onPress={()=> this.BVT()} title="BVT"/>
                 <Button onPress={()=> this.a()} title="a"/>
                 <Button onPress={()=> this.b()} title="b"/>
                 <Button onPress={()=> this.User_AllRest()} title="User_AllRest"/>

                 </View>  
         </View>*/
    );
}
}
const RootStack = createStackNavigator(
    {
      a:a,
      b:b,
      FirstScreen: FirstScreen,
      AppNavigator: AppNavigator,
      DangKy: DangKy,
      DangNhap:DangNhap,
      SettingScreen:SettingScreen,
      MainTabBar:MainTabBar,
      QuanLyQuanAn:QuanLyQuanAn,
      TaoQuanAn:TaoQuanAn,
      ChiTietQuanAn:ChiTietQuanAn,
      ThemLoaiMonAn:ThemLoaiMonAn,
      ThemMonAn:ThemMonAn,
      Test:Test,
      Test1:Test1,
      Test2:Test2,
      BVT:BVT,
      User_AllRest:User_AllRest,
      ChonLoaiMonAn:ChonLoaiMonAn,
      ChuQuanXemOrder:ChuQuanXemOrder,
      TaoQRCode:TaoQRCode,
      NguoiDung_XemQuanAn:NguoiDung_XemQuanAn,
      NguoiDung_MenuChinh:NguoiDung_MenuChinh,
      ChuQuan_YeuCauTinhTien:ChuQuan_YeuCauTinhTien,
    },
    {
      initialRouteName: 'FirstScreen',
      transitionConfig:()=>({
          transitionSpec:{
              duration:0,
              timing: Animated.timing,
          }
      })
    }
  );



export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            // TenTaiKhoan:null,
        }
    };
   
    render() {
      return(
      <RootStack/>
        );
    }
  }
  

const styles = StyleSheet.create({
    container1:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'skyblue',
        width:200,
    },
    nut:{
        justifyContent:'center',
        backgroundColor:'green',
        flex:1,
        flexDirection:'column',

       
    },
    container:{
        flex:1,
        paddingTop: 30,
       backgroundColor:'white',  
       justifyContent:'center',
       alignContent:'center',
       alignItems:'center',
    },
});