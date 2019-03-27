import React, { Component } from 'react';
import {Keyboard, StyleSheet,View,Text,TextInput,Button ,Image,ImageBackground,Alert,AsyncStorage,Dimensions,TouchableOpacity} from 'react-native';

import { DefaultAccount,
    DefaultIP,
    setDefaultAccount,
    DefaultMaQuanAn,
    setDefaultMaQuanAn,
    defaultDanhSachMonAn,
    setdefaultDanhSachMonAn,
    DefaultMaMonAn,
    setDefaultMaMonAn,
    setDefaultQr,
    defaultQrMaQuan,
    defaultQrMaBan

} from './DefaultValue';
import { DialogComponent, DialogTitle } from 'react-native-dialog-component';

import Dialog, { DialogContent,DialogButton } from 'react-native-popup-dialog';

import { FlatList } from 'react-native-gesture-handler';



export default class NguoiDung_XemCacMonDaGoi extends React.Component{
    constructor () {
        super()
        this.state = {
          selectedIndex: 0,
          DanhSachMonDaGoi:[],
          MaHoaDon:0,
          ModalVisible:false,
          DanhSachMonTinhTien:[],
          TongTien:0
        }
    }
LayDanhSachCacMonDaGoi(){
    fetch(`${DefaultIP}LayCacMonDaGoi`,{
        method:'POST',
        body:`MaQuan=${defaultQrMaQuan}&MaBan=${defaultQrMaBan}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).
    then((response)=> response.json()).
    then((responseJson) => {
    this.setState(
        {
            DanhSachMonDaGoi:responseJson,
           MaHoaDon:responseJson[0].MaHoaDon
        },()=>{

            if (Object.keys(this.state.DanhSachMonDaGoi).length > 0){
                let TongTien1 = 0
            for(var i = 0; i < this.state.DanhSachMonDaGoi.length; i++) {
                if (this.state.DanhSachMonDaGoi[i].TinhTrangMonAn == 1){
              var   sotien = (this.state.DanhSachMonDaGoi[i].GiaTien * this.state.DanhSachMonDaGoi[i].SoLuongMon) + this.state.TongTien
                TongTien1 += sotien;

            }
            else{
                console.log("...")
            }
            if(i == this.state.DanhSachMonDaGoi.length -1){
                this.setState({
                    TongTien:TongTien1
                })
            }
            }
        }
            
            // console.log("=====")
            // console.log(`${this.state.MaHoaDon}`);
            // console.log("======")
         });
    }
)
}


TinhTien(){
    fetch(`${DefaultIP}TinhTien`,{
        method:'POST',
        body:`MaHoaDon=${this.state.MaHoaDon}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).
    then((response)=> response.json()).
    then((responseJson) => {
    this.setState(
        {
            DanhSachMonTinhTien:responseJson,
        },()=>{
            console.log("=====")
            // console.log(`${this.state.MaHoaDon}`);
            console.log("======")
         });
    }
)
}
componentWillMount(){
    this.LayDanhSachCacMonDaGoi();
}
componentWillUnmount(){
    this.setState({
        DanhSachMonDaGoi:{},
        MaHoaDon:{}
    })
}


    render(){
        return(
            <View>
               <View>


               <Dialog
    visible={this.state.ModalVisible}
    onTouchOutside={() => {
      this.setState({ ModalVisible: false });
    }}
    height={400}
    dialogTitle={<DialogTitle title="Hóa Đơn" />}
    keyExtractor={(item, index) => index.toString()}
    >
    <DialogContent>
     <View style={{width:Dimensions.get("screen").width-100,flex:1,height:200}}>
      {/* <ScrollView> */}
      <View>
      <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.DanhSachMonDaGoi} 
                    renderItem={({item}) => 
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:27}}>
                           
                            <Image
                        style={{width:70,height:70}}
                        source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}} 
                        />
                               
                            </View>
                            <View style={{flex:26, 
                                 alignContent:'center', 
                                 alignItems:'center',
                                  justifyContent:'center'}}>
                             
                                <Text>{item.TenMonAn} </Text>
                            </View>
                            <View style={{flex:20, alignContent:'center', 
                                 alignItems:'center',
                                  justifyContent:'center'}}>
                                
                                <Text>{item.SoLuongMon}</Text>
                            </View>
                            <View style={{flex:22, alignContent:'center', 
                                 alignItems:'center',
                                  justifyContent:'center'}}>
                            
                                <Text>{(item.GiaTien*item.SoLuongMon + "đ").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                        </View>}

                />
                </View>
                <View style={{paddingTop:20}}>
                    <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Tổng Tiền: {(this.state.TongTien).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</Text>
                    <Button 
                        title="Thanh toán tiền mặt"
                        onPress={()=>{
                            // Alert.alert("aaa");
                            this.TinhTien();
                        }}
                />
                </View>
        {/* </ScrollView> */}
         </View>
    </DialogContent>
  </Dialog>
               </View>



                <View style={{flexDirection:'row', alignItems:'stretch', justifyContent:'space-between'}}>
                    <View>
                        <Text>Minh họa</Text>
                    </View >
                    <View>
                        <Text>Tên món</Text>
                    </View>
                    <View>
                        <Text>Số lượng</Text>
                    </View>
                    <View>
                        <Text>Tình trạng</Text>
                    </View>
                    <View>
                        <Text>Giá tiền</Text>
                    </View> 
                     
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.DanhSachMonDaGoi} 
                    renderItem={({item}) => 
                        <View style={{flexDirection:'row', paddingBottom:5,justifyContent:'space-between',alignItems:'stretch'}}>
                            <View style={{flex:20}}>
                            <Image
                            style={{width:60,height:60}}
                            source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}} 
                            />
                               
                            </View>
                            <View style={styles.tenMonAn}> 
                                <Text>{item.TenMonAn} </Text>
                            </View>

                            <View style={styles.soluongMon}>    
                                <Text>{item.SoLuongMon}</Text>
                            </View>

                            <View style={styles.tinhTrang}>
                                <Text>{(item.TinhTrangMonAn == 0) ? "Đang làm":(item.TinhTrangMonAn == 1) ? "Đã xong":"Đã huỷ"}</Text>
                            </View>

                            <View style={styles.giaTen}>
                                <Text>{(item.GiaTien*item.SoLuongMon  + "đ").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>

                            
                            
                        </View>}

                />
                <View style={styles.tongTien}>
                    <Text style={{fontSize:20,textAlign:"right"}}>{(Object.keys(this.state.DanhSachMonDaGoi).length == 0) ? "":`Tổng Tiền ${(this.state.TongTien).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`}</Text>
                </View>
                <View>
                    <TouchableOpacity
                    onPress={()=>{
                        Alert.alert(
                            `Thanh Toán ${this.state.TongTien}`,
                            'Bạn có chắc muốn thanh toán',
                            [
                              {text: 'Có', onPress: () => this.setState({
                                  ModalVisible:true,
                              })},
                              {text: 'Hủy', onPress: () => console.log('Cancel'), style:'cancel'},
                            ],
                            { cancelable: false }
                          )
                    }}
                    >
                    <Text style={{textAlign:'center',fontSize:20,color:'#007aff',paddingTop:20}}>{(Object.keys(this.state.DanhSachMonDaGoi).length == 0) ? "":"Tính Tiền"}</Text>


                    </TouchableOpacity>
            


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,

    },
    giaTen:{
        flex:20, alignContent:'flex-end', 
        alignItems:'flex-end',
        justifyContent:'center',
    },
    tenMonAn:{
        flex:20, 
        alignContent:'center', 
        alignItems:'flex-start',
        justifyContent:'center',
    },
    tinhTrang:{
        flex:20, alignContent:'center', 
        alignItems:'center',
        justifyContent:'center',
    },
    soluongMon:{
        flex:20, alignContent:'center', 
        alignItems:'center',
        justifyContent:'center',
        
     },
     tongTien:{
        alignContent:'center',
        alignItems:'center',
     },
});