import React from 'react';
import { StyleSheet,View,Text,TextInput,Button ,Image,ImageBackground,Alert,AsyncStorage} from 'react-native';
import { createStackNavigator,StackActions,NavigationAction } from 'react-navigation';
import MainScreen from './MainScreen'
import AppNavigator from '../navigation/AppNavigator';
import MainTabBar from './MainTabBar';
import * as Animatable from 'react-native-animatable';
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';

//import User_AllRest from './UserComponents/User_AllRest';

export default class DangNhap extends React.Component{
    static navigationOptions = ({ navigate, navigation }) => ({
        title: 'Đăng Nhập',
        // header:null,
      });

    constructor(props){
        super(props);
        this.state={
            TenTaiKhoan:"",
            MatKhau:"",
            TraVe:null,
            DisableNutDangKy:true,
            LoiDangNhap:"",
        }
    };

componentWillMount(){

};
    DangNhap(){
        fetch(`${DefaultIP}DangNhap`,{
            method:'POST',
            body:`TenTaiKhoan=${this.state.TenTaiKhoan}&MatKhau=${this.state.MatKhau}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        }).
        then((response)=> response.json()).
        then((responseJson) => {
           this.setState(
               {
                   TraVe:responseJson,
               },
               () => {
                    if (this.state.TraVe.status == 'true'){
                        this._storeData();
                        AppNavigator.navigationOptions={
                            header:null,
                        };
                        this.props.navigation.navigate('AppNavigator');
                    }else{
                        this.setState({
                            LoiDangNhap:"Sai tên tài khoản hoặc mật khẩu.",
                            DisableNutDangKy:true
                        })
                        //Alert.alert(`Đăng nhập thất bại`);
                    }
                }
            )
        }
    )
};

_storeData (){
    AsyncStorage.setItem('TenTaiKhoan', `${this.state.TenTaiKhoan}`);
    setDefaultAccount(this.state.TenTaiKhoan);
  }
ChuyenDenManHinhChinh(){
    AppNavigator.navigationOptions={
        header:null,
    };
    // MainTabBar.navigationOptions={
    //     header:null,
    // },
    // this.props.navigation.dispatch(pushToMainScreen);
    this.props.navigation.navigate('AppNavigator');
    // console.log(this.props.navigation.getParam('TenTaiKhoan','1111'));
};

CheckInput(){
    if (!this.state.TenTaiKhoan || !this.state.MatKhau ){
        this.setState({
            DisableNutDangKy : true
        });
    }
    else{
        this.setState({
            DisableNutDangKy : false
        })
    };
    this.setState({
        LoiDangNhap:"",
    })

};

User_AllRest(){
    this.props.navigation.navigate('User_AllRest');
    // this.props.navigation.navigate('AppNavigator');

}

render() {
    return (


<View style={stylesDN.container}>

    <View style={stylesDN.form}>               
        <TextInput 
        placeholder="Nhập tài khoản" 
        placeholderTextColor='white'

        style={stylesDN.textInput}
        // autoFocus={true}
        onChangeText={ 
                        (Text) => {
                                this.setState({
                                TenTaiKhoan:Text,
                            },() => this.CheckInput()
                            );
            }}
        />
    </View>

    <View style={stylesDN.form}>               
        <TextInput 
        placeholder="Mật khẩu" 
        placeholderTextColor='white'
        secureTextEntry={true}
        style={stylesDN.textInput}
        // autoFocus={true}
        onChangeText={
        (Text) => {
        this.setState({
        MatKhau:Text,
        }, () => this.CheckInput()
        );
        }}
        />
    </View>
        <Animatable.Text 
            iterationCount="infinite" 
            animation="jello"
            style={{
                marginTop:10,
                color:'white',
                textAlign:'right'
            }}
            >
            {this.state.LoiDangNhap}
        </Animatable.Text>
        
        <View style={stylesDN.form}>               
            <Button title="Đăng Nhập" 
            color='white'
            // color='blue'
            disabled={this.state.DisableNutDangKy}
            onPress={()=>{
            this.DangNhap();
            }}
            style={{paddingTop:20}}
            />
        </View>
            <View style={stylesDN.form}>   
            </View>

            <View style={{marginTop:10}}>
                <Button onPress={()=> this.User_AllRest()} title="Skip"/>
                <View><Text style={{color:'white'}}></Text></View>
            </View>

            <View style={{marginTop:10}}>
                <Button  title="Quên mật khẩu"/>
                <View><Text style={{color:'white'}}></Text></View>
            </View>
    </View>
    );
  }}
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
        color:'white',
    },
});