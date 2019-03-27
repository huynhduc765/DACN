import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import {SearchBar} from 'react-native-elements';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,FlatList,
    Dimensions
} from 'react-native';
import {DefaultMaQuanAn,defaultSoLuongBan} from './DefaultValue'
 
export default class TaoQRCode extends Component {
    constructor(props){
    super(props);
    this.state={
        // qr:'',
        MangBan:[],
        DataSourceDanhSachBanAn:[],
           }
}
TimKiem(text)
    {
        const newData = this.state.DanhSachQuanAn.filter(function(item){
            const itemData = item.TenQuanAn.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: ds.cloneWithRows(newData),
            text:text
        })
}

TaoArray(){
  var MangBan = [];
  for (i = 0 ; i < defaultSoLuongBan ; i++){
      MangBan.push(i+1);
  }
  return MangBan
}

  componentDidMount(){
    this.setState({
      MangBan:this.TaoArray()
    },()=>{
      console.log(this.state.MangBan)
    })
    //   console.log("default")
    //   console.log(DefaultMaQuanAn);
    //   console.log(this.state.qr);
    //   this.setState({
    //         qr:DefaultMaQuanAn
    //   });
    //   console.log(this.state.qr);

  
  }
 
  render() {
    return (
      <View style={styles.container}>
        {/* <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        /> */}
        
        {/* <SearchBar
            // darkTheme
            lightTheme
            onChangeText={(text)=>{this.TimKiem(text)}

         

            }            value={this.state.text}

            value={this.state.text}
            onClear={()=>{

            }}
            placeholder='Search here'
            cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            /> */}
        

        <FlatList 
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        extraData={this.state}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={this.state.MangBan} 
        renderItem={({item}) => 
        <View style={{margin:10,}}>
            <View style={{paddingBottom:10, paddingLeft:10}}>
              <QRCode
              value={`${DefaultMaQuanAn}-${item}-QuanLyQuanAn`}
              size={Dimensions.get('screen').width-40}
              bgColor='black'
              fgColor='white'
              />
         
              <Text style={{fontSize:20,textAlign:'center',paddingTop:20,alignItems:'center'}}>
                Mã QR bàn :  {`Bàn số ${item}`}
              </Text>
            </View>
        </View>
      }
        />
        

          
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      //  alignItems: 'center',
        //justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});