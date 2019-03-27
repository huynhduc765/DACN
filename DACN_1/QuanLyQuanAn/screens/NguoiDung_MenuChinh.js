import React, { Component } from 'react';
import {Keyboard, StyleSheet,View,Text,TextInput,Button ,Image,ImageBackground,Alert,AsyncStorage,Dimensions} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import NguoiDung_XemQuanAn from './NguoiDung_XemQuanAn';
import NguoiDung_XemCacMonDaGoi from './NguoiDung_XemCacMonDaGoi';

export default class GroupButtonClass extends React.Component{
  static navigationOptions ={
    header:null
    }
      constructor(props)  {
        super(props)
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
const component1 = () => <View><Text>Thông Tin Quán</Text></View>
const component2 = () => <View><Text>Các món đã gọi</Text></View>
// const component3 = () => <View><Text>Quên mật khẩu</Text></View>
const buttons = [{ element: component1 }, { element: component2 }]
  // , { element: component3 }]
const { selectedIndex } = this.state
var formHienThi;
if(selectedIndex === 0){
    formHienThi = <View style={{width:Dimensions.get('screen').width - 20,
                            height:Dimensions.get('screen').height,
                            marginTop:0,
                            }}>
         <NguoiDung_XemQuanAn navigation={navigation} />
          </View>
}
else if (selectedIndex === 1){
    formHienThi = 
            <View style={{width:Dimensions.get('screen').width - 20,height:Dimensions.get('screen').height}}> 
                {/* <View>
                  <Text>Các món đã gọi</Text>
                </View> */}
                <NguoiDung_XemCacMonDaGoi />
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
        <View style={{paddingLeft:10}}> 
            {formHienThi}
        </View>
    </View>
    
  );
  }
};

  const styles1 = StyleSheet.create({
    container:{
        flex:1,
        // alignItems:'stretch',
        paddingTop:20,
        // paddingLeft:5,
        // paddingRight:5,
    },
    groupButton:{
        // color:'white',
        // flex:1,
        // backgroundColor:'red',
        height:50,
    }
    
});

  
