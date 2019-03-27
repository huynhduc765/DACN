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
            DanhSachTinhTien:[],
            Status:"",
        }
    }


    componentDidMount(){
        this.LayDanhSachTinhTien();


        this.intervalID = setInterval(
            () => this.LayDanhSachTinhTien(),
            1000
          );
    }
    LayDanhSachTinhTien(){
      fetch(`${DefaultIP}LayDanhSachTinhTien`,{
         method:'POST',
         body:`MaQuan=${DefaultMaQuanAn}` +`&MaQuanAn=${1}&MaBan=${2}`,
         headers:{
             'Content-Type': 'application/x-www-form-urlencoded'
         }
     }).then((response)=> response.json()).
     then((responseJson) => {
     this.setState(
         {
            DanhSachTinhTien:responseJson,
             // Loading:false,
         },()=>{
             // Alert.alert(`${JSON.stringify(this.state.DanhSachMonDuocGoi)}`);
             console.log(this.state.DanhSachTinhTien);
          });
     })     
}
ChuQuanXacNhanTinhTien(MaHoaDon){
   fetch(`${DefaultIP}ChuQuanXacNhanTinhTien`,{
      method:'POST',
      body:`MaHoaDon=${MaHoaDon}`,
      headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  }).then((response)=> response.json()).
  then((responseJson) => {
  this.setState(
      {
         Status:responseJson,
          // Loading:false,
      },()=>{
         console.log(this.state.Status);
         // Alert.alert(this.state.Status);
          // Alert.alert(`${JSON.stringify(this.state.DanhSachMonDuocGoi)}`);
         //  console.log(this.state.DanhSachTinhTien);
       });
  })     
}




   
   

    render(){
 
    return(
     
        <View style={styles.container}>    

        

              <View style={styles.Top}>
                    <View style={styles.TopLeft}>
                            <Text style={{fontSize:18}}>Mã Hóa Đơn</Text>
                    </View>

                     <View style={styles.TopMid}>
                            <Text style={{fontSize:18}}>Bàn</Text>
                    </View> 

                     <View style={styles.TopRight}>
                            <Text style={{fontSize:18}}>Số Tiền</Text>    
                     </View>   

               </View>
                
                            <View style={{paddingTop:10}}>
                            <FlatList
                             keyExtractor={(item, index) => index.toString()}
                             extraData={this.state}
                             horizontal={false}
                             showsVerticalScrollIndicator={false}
                             showsHorizontalScrollIndicator={false}
                             data={this.state.DanhSachTinhTien} 
                            renderItem={({item}) => 
                            <TouchableOpacity
                            onPress={()=>{
                              Alert.alert(
                                 'Xác Nhận Tính Tiền',
                                 'Bạn có chắc muốn tính tiền',
                                 [
                                   {text: 'Có', onPress: () => this.ChuQuanXacNhanTinhTien(item.MaHoaDon)},
                                   {text: 'Hủy', onPress: () => console.log('Cancel'), style:'cancel'},
                                 ],
                                 { cancelable: false }
                               )
                            }}
                            >
                            <View style={styles.container1}>
                                {/* <View style={styles.PositionIMG}>
                                    <Image
                                    style={{width:90,height:90}}
                                    source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}} 
                                    />
                                </View> */}

                        
                            
                                <View style={styles.PositonText}>
                                    <Text style={{fontSize:18}}>{item.MaHoaDon}</Text>
                                    <Text style={{fontSize:18}}>{item.MaBan}</Text>
                                    <Text style={{fontSize:18}}>{(item.TongTien).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</Text>
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
    paddingTop:0,
        
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
    flexDirection:'row',
   alignItems:'flex-start',
   justifyContent:'space-between',
   paddingLeft:10,
   paddingRight:5,
   
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



