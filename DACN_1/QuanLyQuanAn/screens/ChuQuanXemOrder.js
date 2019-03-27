//kêu thêm rau
//Mua thì bán
import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Text,
    View,
    Alert,
    AsyncStorage,
    Button,
    ScrollView, 
    ListView,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    FlatList

} from 'react-native';
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

} from './DefaultValue'
import moment from 'moment';


import { createStackNavigator } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { SearchBar } from 'react-native-elements';
import io from 'socket.io-client'

export default class ChuQuanXemOrder extends React.Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Thông tin khách order món ăn",
         });
    constructor(props){
        super(props);
        this.state={
            DanhSachMonDuocGoi:[],
        }
        this.socket = io(`${DefaultIP}`,{jsonp:false});
        this.socket.on("goi-mon-quan-1",function(data){
        
            // Alert.alert(`${data}`)
            console.log("=========================");
            console.log("Quan An Nhan Duoc");
            console.log(data);
        })
    }


    componentDidMount(){
        this.LayDanhSachCacMonDuocGoi();


        this.intervalID = setInterval(
            () => this.LayDanhSachCacMonDuocGoi(),
            1000
          );
    }



    KhongNhan(){
        return;
    }


    LayDanhSachCacMonDuocGoi(){
        fetch(`${DefaultIP}LayCacMonDuocGoi`,{
            method:'POST',
            body:`MaQuan=${DefaultMaQuanAn}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }). // fetch('${DefaultIP}goimon,'{
            //method:'POST',
            //body: 'data='+JSON.stringify(this.state.DanhSachMonAnOrder)+`&MaQuanAn=${defaultQrMaQuan}&MaBan=${defaultQrMaBan}`,
            //headers:{
              //  'Content-Type': 'application/x-www-form-urlencoded'
            //}
        //}
        then((response)=> response.json()).
        then((responseJson) => {
        this.setState(
            {
                DanhSachMonDuocGoi:responseJson,
                // Loading:false,
            },()=>{
                // Alert.alert(`${JSON.stringify(this.state.DanhSachMonDuocGoi)}`);
                console.log(this.state.DanhSachMonDuocGoi);
             });
        }
    )
    }
   
    DanhDauMonAnHoanThanh(MaHoaDon,MaMonAn,TT){
        fetch(`${DefaultIP}DanhDauMonAnHoanThanh`,{
            method:'POST',
            body:`MaHoaDon=${MaHoaDon}&MaMonAn=${MaMonAn}&TinhTrang=${TT}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }). // fetch('${DefaultIP}goimon,'{
            //method:'POST',
            //body: 'data='+JSON.stringify(this.state.DanhSachMonAnOrder)+`&MaQuanAn=${defaultQrMaQuan}&MaBan=${defaultQrMaBan}`,
            //headers:{
              //  'Content-Type': 'application/x-www-form-urlencoded'
            //}
        //}
        then((response)=> response.json()).
        then((responseJson) => {
        // this.setState(
        //     {
        //         DanhSachMonDuocGoi:responseJson,
        //         // Loading:false,
        //     },()=>{
        //         // Alert.alert(`${JSON.stringify(this.state.DanhSachMonDuocGoi)}`);
        //         console.log(this.state.DanhSachMonDuocGoi);
        //      });
        this.LayDanhSachCacMonDuocGoi()
        }
    )
    }
    

    render(){

 
    return(
     
        <View style={styles.container}>    

        
{/* 
              <View style={styles.Top}>
                    <View style={styles.TopLeft}>
                            <Text style={{fontSize:20}}> Tất cả</Text>
                    </View>

                     <View style={styles.TopMid}>
                            <Text style={{fontSize:20}}>Các Bàn</Text>
                    </View> 

                     <View style={styles.TopRight}>
                            <Text style={{fontSize:20}}>Số Lượng</Text>    
                     </View>   

               </View> */}
                
                            <View style={{paddingTop:10}}>
                            <FlatList
                             keyExtractor={(item, index) => index.toString()}
                             extraData={this.state}
                             horizontal={false}
                             showsVerticalScrollIndicator={false}
                             showsHorizontalScrollIndicator={false}
                             data={this.state.DanhSachMonDuocGoi} 
                            renderItem={({item}) => 


                            <TouchableOpacity
                            onPress={()=>{
                                Alert.alert(
                                    'Thông Báo',
                                    'Đánh dấu món ăn là',
                                    [
                                      {text: 'Đã hoàn thành', onPress: () => {
                                          this.DanhDauMonAnHoanThanh(item.MaHoaDon,item.MaMonAn,1);
                                        }
                                    },
                                      {text: 'Hủy', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
                                      {text: 'Báo hết món', onPress: () => {
                                        this.DanhDauMonAnHoanThanh(item.MaHoaDon,item.MaMonAn,2);
                                      }},
                                    ],
                                    { cancelable: false }
                                  )
                            }
                        }
                            >
                            <View style={styles.container1}>
                                <View style={styles.PositionIMG}>
                                    <Image
                                    style={{width:90,height:90}}
                                    source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}} 
                                    />
                                </View>

                        
                            
                                <View style={styles.PositonText}>
                                    <Text>{item.TenMonAn}</Text>
                                    <Text>Số lượng: {item.SoLuongMon}</Text>
                                    {/* <Text>{item.NgayLap}</Text> */}
                                    <Text>Bàn: {item.MaBan}</Text>
                                    <Text>Đặt lúc: {moment(`${item.NgayLap}`).utc().format('hh:mm')}</Text>
                                    {/* <Text>Bàn: {item.MaBan}</Text> */}
                                </View>

                            </View>
                            </TouchableOpacity>
                        }  
                        horizontal={false} //muti colum
                                              
                        />
                        

        </View>      
    </View>
   
    
   );
 }
}


const styles = StyleSheet.create({
   container:{
   
       flex:1,
    //   backgroundColor:'red'
   },

container1:{
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderRightWidth:0.5,
    paddingTop:10,
        
   },

PositionIMG: {
    flex:25,
    alignItems:'flex-start',
  
},
IMG1: {
    width:180,
    height:120,

 },
PositonText:{
    flex:75,
   alignItems:'flex-start',
   paddingLeft:10,
   
},




   Top:{
        height:50,
       flexDirection:'row',
    
   },
   TopLeft:{ 
       flex:1,
    //    backgroundColor:'red',
       alignItems:'center'
    },
   TopMid:{ 
       flex:1.5,
    //    backgroundColor:'blue', 
       alignItems:'center'
    },
   TopRight:{ 
       flex:1,
    //    backgroundColor:'yellow', 
       alignItems:'center'
    },



   text:{
   fontSize:20,
   },

   text1:{
   fontSize:25,
   },


      
   IMG:{
       flex:1,
    // height:150,
    // width:400,
     borderRadius:1
   },


   TenMonAn:{
       fontSize : 35,
       padding:8,
       justifyContent:'center',
       alignItems:'center',
       alignContent:'center',
       color:'blanchedalmond',
       fontWeight:'bold'
   },
});



