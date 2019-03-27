import React from 'react';
import { StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Alert, 
    AsyncStorage,
    ImageBackground 
    } from 'react-native';
    import { createStackNavigator,StackActions,NavigationAction } from 'react-navigation';
    import AppNavigator from '../navigation/AppNavigator.js';
    import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';

//    import User_AllRest from './UserComponents/User_AllRest';


export default class DangKy extends React.Component{
    static navigationOptions = {
        title: 'Đăng Ký',
        // header:null,
      };
    constructor(props){
        super(props);
        this.state={
            TaiKhoan:null,
            MatKhau:null,
            NhapLaiMatKhau:null,
            DisableNutDangKy:true,
            Trave:null,
        };
    };
KiemTraInput(){
    if ((!this.state.TaiKhoan ) || (!this.state.MatKhau) || (this.state.MatKhau != this.state.NhapLaiMatKhau)){
        this.setState({
            DisableNutDangKy:true,
        });
    }
    else{
        this.setState({
            DisableNutDangKy:false,
        })
    }
};

componentWillMount(){


};
DangNhapThanhCong(){
    AppNavigator.navigationOptions={
        header:null,
    };
    AsyncStorage.setItem('TenTaiKhoan', `${this.state.TenTaiKhoan}`).then(() => {
        setDefaultAccount(this.state.TenTaiKhoan);
        this.props.navigation.navigate('AppNavigator');
    })
}

User_AllRest(){
    this.props.navigation.navigate('User_AllRest');
}


DangKy(){
    return fetch(`${DefaultIP}DangKy`,{
      method:'POST',
      body: `TenTaiKhoan=${this.state.TaiKhoan}&MatKhau=${this.state.MatKhau}`,
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        traVe: responseJson,
        DisableNutDangKy:true,
      })
      if (this.state.traVe.status == "Tên tài khoản đã tồn tại!"){
        Alert.alert(
            `${this.state.traVe.status}`
        );
      }
      else{
          Alert.alert(
              `Đăng Ký Thành Công`,
              `Bạn đã đăng ký thành công tài khoản: \n ${this.state.TaiKhoan}`,
              [
                {text: 'Đăng Nhập' , onPress: () => {
                    this.DangNhapThanhCong();
                }
                 }
              ],
            //   onPress={()=>{
                  
            //   }}
          );
         ;

      }
    })
    .catch((error)=>{
      console.error(error);
    });
  }

render() {
    return (
       
            <View style={styles.container}>
                <View style={styles.form}> 
                {/* <Text style={styles.Name}>Tài Khoản</Text> */}
                <TextInput 
                    placeholder="Nhập tài khoản" 
                    placeholderTextColor='white'
                    style={styles.textInput}
                    returnKeyType="next"
                    // autoFocus={true}
                    onChangeText={(text)=> 
                    this.setState({
                    TaiKhoan : text,
                    })}
                />
                </View>
                
                {/* <Text style={styles.Name}>Mật Khẩu</Text> */}
                <View style={styles.form}> 
                <TextInput placeholder="Nhập mật khẩu" 
                placeholderTextColor='white'
                    style={styles.textInput}   
                    secureTextEntry={true} 
                    returnKeyType="done"
                    onChangeText={ (text) => this.setState({
                    MatKhau:text,
                    },()=>{
                    this.KiemTraInput();
                    })}
                />
                </View>

                {/* <Text style={styles.Name}>Nhập Lại Mật Khẩu</Text> */}
                <View style={styles.form}> 
                <TextInput 
                    style={styles.textInput}
                    placeholderTextColor='white'
                    placeholder="Nhập lại mật khẩu" 
                    secureTextEntry={true} 
                    returnKeyType="done"
                    onChangeText = {(text)=> 
                            this.setState({
                                NhapLaiMatKhau:text,
                            },()=>{
                        this.KiemTraInput();
                        }
                    )}
                />
                </View>

            {/* <View style={styles.form}>  */}
            <View style={{marginTop:10}}>
                <Button title="Đăng ký"
                color='white'
                onPress={()=> this.DangKy()}
                disabled = {this.state.DisableNutDangKy}
                />
                <View><Text style={{color:'white'}}></Text></View>
            </View>
            <View style={{marginTop:10}}>
                <Button onPress={()=> this.User_AllRest()} title="Skip"/>
                <View><Text style={{color:'white'}}></Text></View>
            </View>
        </View>
                         
    );
  }
}

// const pushToMainScreen = StackActions.push({
//     routeName:'AppNavigator',
// });

const styles = StyleSheet.create({
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
        color:'white',
    },
});