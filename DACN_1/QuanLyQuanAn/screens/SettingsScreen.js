import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Text,View,Alert,AsyncStorage,Button,ScrollView,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import QuanLyQuanAn from './QuanLyQuanAn'
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      TenTaiKhoan:null,
    }
  }
  static navigationOptions = {
    title: `Cài Đặt`,
  };

  _retrieveData = async () => {
    AsyncStorage.getItem('TenTaiKhoan').then((value) => {
      this.setState({
        TenTaiKhoan:value
      })
    });
  }

componentWillMount(){
    this._retrieveData();

};

DangXuat(){
    AsyncStorage.setItem('TenTaiKhoan','');
    this.props.navigation.navigate('FirstScreen');
  };
QuanLyQuanAn(){
  this.props.navigation.navigate('QuanLyQuanAn');
}
DanhSachDatBan(){
  this.props.navigation.navigate('DanhSachDatBan');
}

  render() {
    // var TenTaiKhoan = this.props.navigation.getParam('TenTaiKhoan', 'none');
    return(
      
<View style={styles.container}>

  <ScrollView>
  <TouchableOpacity onPress={() => this.QuanLyQuanAn() }>
    <View style={styles.Dong}>
         
          <View style={{flexDirection:'row'}}>
          <Image style={{width:24,height:24}}
              source={require('./IMG/icon-shop.png')}
          />
            <Text 
              style={styles.text}>
              Quản lý quán ăn
            </Text>
            </View>
         
    </View>
    </TouchableOpacity>

  <TouchableOpacity>
    <View style={styles.Dong}>
    <View style={{flexDirection:'row'}}  >
    <Image style={{width:24,height:24}}
              source={require('./IMG/setting-icon.jpg')}
          />
      <Text 
        style={styles.text}>
        Thông tin tài khoản
      </Text>
    </View>
    </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => this.DanhSachDatBan() }>

      <View style={styles.Dong}>
      <View style={{flexDirection:'row'}}>
          <Image style={{width:26,height:26}}
                    source={require('./IMG/logout-icon.jpg')}
                />
              <Text 
                style={styles.text}>
                Danh sách đặt bàn
              </Text>
      </View>
      </View>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => this.DangXuat() }>

    <View style={styles.Dong}>
    <View style={{flexDirection:'row'}}>
        <Image style={{width:26,height:26}}
                  source={require('./IMG/logout-icon.jpg')}
              />
            <Text 
              style={styles.text}>
              Đăng Xuất
            </Text>
    </View>
    </View>
    </TouchableOpacity>

  </ScrollView>

</View> 
    );  
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems:'stretch',
      paddingTop:10,
      backgroundColor:'white',
  },
  Dong:{
      flex:1,
      flexDirection:'row',
      paddingTop:10,
      paddingRight:10,
      paddingLeft:10,
      paddingBottom:5,
      borderColor:'lightgray',
      borderBottomWidth:0.3,
  },
  text:{
    fontSize:20,
    paddingLeft:5,

  }
});