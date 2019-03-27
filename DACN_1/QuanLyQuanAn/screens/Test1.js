import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Animated, 
    Easing ,
    Text,View,Alert,
    AsyncStorage,
    Button,
    StyleSheet,
    FlatList,Linking} from 'react-native';
    import {FormInput,FormLabel} from 'react-native-elements';
    import Dialog from "react-native-dialog";

import { createStackNavigator } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {SearchBar} from 'react-native-elements';
import {DefaultAccount,DefaultIP,DefaultMaQuanAn, setdefaultDanhSachMonAn, } from './DefaultValue';
import {LottieView} from 'lottie-react-native';


   

export default class ChiTietMonAn extends React.Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Đặt bàn Online",
     
    });
    
    constructor(props){
        super(props);
        this.state={
          TenNguoiDat:"",
          ChuThich:"",
          SDT:true,
          NgayGio:"",
          dialogVisible: false,
          TraVe:"",
          

        }
      };

      
  
  KiemTraInput(){
    if (this.state.TenNguoiDat && this.state.ChuThich && this.state.SDT && this.state.NgayGio ){

//   this.setState({
//     DisableNutTao : false
// })
return true
    }
    else{
        // this.setState({
        //     DisableNutTao:true
        // })
        return false
    }
  };


  ThongBaoChuaNhapDu(){
    Alert.alert("Vui lòng nhập đầy đủ thông tin!");
}


    render(){
        // const data = this.createData();
          return(
              // <ImageBackground style={ styles.imgBackground }
              //          resizeMode='cover' 
              //          source={require('./IMG/background.jpg')}>
      
      <View style={styles.container}>
          <View>
              <View>
                  <View>
                                                
                        <FormLabel>Tên người đặt</FormLabel>
                        <FormInput
                        maxLength={20}
                        autoFocus={false}
                        placeholder=""
                        style={styles.textInput}
                        onChangeText={
                        (text) => {
                            this.setState(
                                {
                                TenNguoiDat:text
                                },()=>{
                                this.KiemTraInput();
                            });
                        }
                        }/>
                    
                   </View >
    
    
                       <View>
                            <FormLabel>Mô tả yêu cầu</FormLabel>
                            <FormInput
                            
                                multiline={true}
                                // numberOfLines={3}
                                autoFocus={false}
                                placeholder=""
                                style={styles.textInput}
                                onChangeText={
                                    (text) => {
                                        this.setState(
                                            {
                                                ChuThich:text
                                            },()=>{
                                                this.KiemTraInput();
                                            });
                                    }
                                }
                                multiline={true}/>   
                        </View>
    
                  </View>
                  <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                        <FormLabel>SDT liên lạc</FormLabel>
                            <FormInput
                            autoFocus={false}
                            placeholder="SDT"
                            style={styles.textInput}
                            onChangeText={
                            (text) => {
                                this.setState(
                                    {
                                    SDT:text
                                    },()=>{
                                    this.KiemTraInput();
                                });
                                }
                            }/>
                        </View>
                
                  </View>
                  <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                        <FormLabel>Ngày giờ</FormLabel>
                            <FormInput
                            autoFocus={false}
                            placeholder="Ngày giờ"
                            style={styles.textInput}
                            onChangeText={
                            (text) => {
                                this.setState(
                                    {
                                    NgayGio:text
                                    },()=>{
                                    this.KiemTraInput();
                                });
                                }
                            }/>
                        </View>
                
                  </View>
    
                  <View> 
    
                      <Button 
                      title="Gửi đặt bàn"
                      onPress={()=>{
    
                        if (this.KiemTraInput() == true){
                          return;
                        }
                        else{
                            this.ThongBaoChuaNhapDu();
                        }
                      }}
                      />
                  </View>
              </View>
              
      </View>
              // </ImageBackground>
          );
      }
      }
      
      
      
      
      
      
      const styles = StyleSheet.create({
          container:{
          
              flex:1,
         
              paddingTop:10,
              paddingLeft:30,
              paddingRight:30,
          },
        
          imgBackground: {
              width: '100%',
              height: '100%',
      
      },
       
          
       
       
          textInput:{
              fontSize:17, 
              padding:5,
              margin:5,
              borderBottomColor:'green',
              
          },
          loading: {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            },
       });
      
      
    
    
    