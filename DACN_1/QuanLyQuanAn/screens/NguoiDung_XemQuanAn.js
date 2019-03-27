import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Animated, 
    Easing ,
    Text,View,Alert,
    AsyncStorage,
    Button,
    ScrollView,
    ListView,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
    FlatList,Linking,
    TouchableHighlight,
    ImageBackground,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {SearchBar} from 'react-native-elements';
import { DialogComponent, DialogTitle } from 'react-native-dialog-component';
import Dialog, { DialogContent,DialogButton } from 'react-native-popup-dialog';
import io from 'socket.io-client';


import {LottieView} from 'lottie-react-native';


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

import BVT from './BVT';
   

export default class NguoiDung_XemQuanAn extends React.Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        // title: "Chi Tiết Quán Ăn",
        header:null
        // headerRight: (
        //     <Button
        //       onPress={() => alert('This is a button!')}
        //       title="Sửa"
        //     //   color="blue"
        //     />
        //   ),
    });
    constructor(props){
        super(props);
        this.state={
        text:"",
        ThongTinQuanAn:"",
        Loading:true,
        DanhSachLoaiMonAn:"",
        DanhSachMonAn:"",
        DataSourceDanhSachMonAn:"",
        SearchBarHeight:0,
        SearchButton:"🔍",
        LoaiMonAnDuocChon:"",
        Color:"black",
        ChonTatCa:true,
        modalVisible:false,
        MonAnDuocChon:{},
        DanhSachMonAnOrder:[],
        SoLuongCuaMon:"",
        }
        this.socket = io(`${DefaultIP}`,{jsonp:false});
    };

    ChonTatCa(){ 
            this.setState({
                ChonTatCa: true,
                DataSourceDanhSachMonAn:this.state.DanhSachMonAn
            })        
    }
    
    ToggleSearchBar(){
        if (this.state.SearchBarHeight === 0){
            this.setState({
                SearchBarHeight:50,
                SearchButton:"×"
            })
        }
        else{
            this.setState({
                SearchBarHeight:0,
                SearchButton:"🔍"
            })
        }
    }



ClickFoodImage(item){
this.setState({ 
    MonAnDuocChon:item,
    // modalVisible:true,
})
this.HienThiSoLuong(item)
}
    LayDanhSachMonAn(){
        fetch(`${DefaultIP}LayDanhSachMonAn`,{
            method:'POST',
            body:`MaQuanAn=${defaultQrMaQuan}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).
        then((response)=> response.json()).
        then((responseJson) => {
        this.setState(
            {
                DanhSachMonAn:responseJson,
                DataSourceDanhSachMonAn:responseJson,
                // Loading:false,
            },()=>{
                console.log(this.state.DanhSachMonAn)
                      }
            );
        }
    )
    };
    
  
    LocMonAn(data){
        if (this.state.ChonTatCa == true){
            this.setState({
                DataSourceDanhSachMonAn:DanhSachMonAn
            })
        }
        else{
            var newData=this.state.DanhSachMonAn.filter(function(item){
                return item.MaLoaiMonAn == data;         
            });
                this.setState({
                    DataSourceDanhSachMonAn:newData
                })
            }
    
    }
 

    GoiDienThoai() {
        if (this.state.ThongTinQuanAn.SoDienThoai === "")
        {
            return
        }
        var url =  `tel:${this.state.ThongTinQuanAn.SoDienThoai}`;
        // console.tron.log('Trying to access url')
        // console.tron.log(url)
        Linking.canOpenURL(url).then(supported => {
          if (!supported) {
              console.log("..");
            // console.tron.log('Can\'t handle url: ' + url)
          } else {
            return Linking.openURL(url)
          }
        }).catch(err => console.error('An error occurred', err))
      }

    LoadThongTin(){
        this.LayThongTinQuanAn();
        this.LayDanhSachLoaiMonAn();
        this.LayDanhSachMonAn();
    }

    LayThongTinQuanAn(){
        fetch(`${DefaultIP}LayQuanAnTuMa`,{
            method:'POST',
            body:`MaQuanAn=${defaultQrMaQuan}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).
        then((response)=> response.json()).
        then((responseJson) => {
        this.setState(
            {
                ThongTinQuanAn:responseJson[0],
                Loading:false,
            },()=>{
                console.log(responseJson);
            }
            );
        }
    )
    };

    LayDanhSachLoaiMonAn(){
        fetch(`${DefaultIP}LayDanhSachLoaiMonAn`,{
            method:'POST',
            body:`MaQuanAn=${defaultQrMaQuan}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).
        then((response)=> response.json()).
        then((responseJson) => {
        this.setState(
            {
                DanhSachLoaiMonAn:responseJson,
                // Loading:false,
            },()=>{
                // console.log("KEY VALUE \n");
                // result = Object.keys(this.state.DanhSachLoaiMonAn).map(k => ({ [k]: this.state.DanhSachLoaiMonAn[k] }));
                setdefaultDanhSachMonAn(responseJson);
                console.log(this.state.DanhSachLoaiMonAn)
                
                // console.log(responseJson);
            }
            );
        }
    )
    };


    componentWillMount(){
        

    };


ThemMonOrder (item){

var KiemTraTonTai = () => { 
return new Promise((resolve,reject)=>{
   var tempAraay = this.state.DanhSachMonAnOrder;
    for(i in this.state.DanhSachMonAnOrder){
    if (this.state.DanhSachMonAnOrder[i].MaMonAn == item.MaMonAn){
        tempAraay[i].SoLuong = tempAraay[i].SoLuong + 1
        this.setState({
            DanhSachMonAnOrder:tempAraay,
            SoLuongCuaMon:tempAraay[i].SoLuong
        },()=>{
            // console.log("state "+ JSON.stringify(this.state.DanhSachMonAnOrder))
        }
        )
        return resolve()
    }
    }
    return reject();
})
}
var them = () => {
    var monAnObj = {
        "MaMonAn" : item.MaMonAn,
        "SoLuong" : 1,
        "Avatar"  : item.Avatar,
        "TenMonAn" :item.TenMonAn,
        "GiaTien" : item.GiaTien,
        }
        this.setState({
            DanhSachMonAnOrder:this.state.DanhSachMonAnOrder.concat(monAnObj),
            SoLuongCuaMon:1
        },()=>{
            // console.log("state "+ JSON.stringify(this.state.DanhSachMonAnOrder))
        }
        )}   
    var ThemMon = async() =>{
        var a = await KiemTraTonTai().then( 
            console.log("1")
            ).catch(()=>{
            them();
            }
        )
    }


    ThemMon();
}

  
HienThiSoLuong(item){
    for(i in this.state.DanhSachMonAnOrder){
        if (this.state.DanhSachMonAnOrder[i].MaMonAn == item.MaMonAn){
            this.setState({
                SoLuongCuaMon:this.state.DanhSachMonAnOrder[i].SoLuong
            })
            return
        }
        else{
            this.setState({
                SoLuongCuaMon:0
            })
        }
    }
}


BotMonOrder (item){
    var tempAraay = this.state.DanhSachMonAnOrder;

    for(i in tempAraay){
        if(tempAraay[i].MaMonAn == item.MaMonAn && tempAraay[i].SoLuong > 1){
            console.log("tru");
            tempAraay[i].SoLuong = tempAraay[i].SoLuong - 1;
            this.setState({
                DanhSachMonAnOrder:tempAraay,
                SoLuongCuaMon:tempAraay[i].SoLuong
            },()=>{
                // this.ClickFoodImage(item);
                // console.log(JSON.stringify(this.state.DanhSachMonAnOrder))
            })
        }
        else if (tempAraay[i].MaMonAn == item.MaMonAn && tempAraay[i].SoLuong == 1){
            tempAraay.splice(i,1);
            this.setState({
                DanhSachMonAnOrder:tempAraay,
                SoLuongCuaMon:0
            },
            ()=>{
                // this.ClickFoodImage(item);
                // console.log(JSON.stringify(this.state.DanhSachMonAnOrder))
            })
            
            //console.log("Xoa")
        }


    // if ((this.state.DanhSachMonAnOrder[i].MaMonAn == item.MaMonAn) && (this.state.DanhSachLoaiMonAn[i].SoLuong == 1))
    // {
    //     tempAraay.splice(i,1);
    //     this.setState({
    //         DanhSachMonAnOrder:tempAraay
    //     },()=>{
    //         console.log("state "+ JSON.stringify(this.state.DanhSachMonAnOrder))
    //     }
    //     )
    // }
    // else if ((this.state.DanhSachMonAnOrder[i].MaMonAn == item.MaMonAn) && (this.state.DanhSachLoaiMonAn[i].SoLuong > 1)){
    //     tempAraay[i].SoLuong = tempAraay[i].SoLuong - 1;
    //     this.setState({
    //         DanhSachMonAnOrder:tempAraay
    //     }
    //     ,()=>{
    //         console.log("state "+ JSON.stringify(this.state.DanhSachMonAnOrder))
    //     })
    // }
    }
}
    

       
// var monAnObj = {
//             "MaMonAn" : item.MaMonAn,
//             "SoLuong" : 1
//         }
//         this.setState({
//             DanhSachMonAnOrder:this.state.DanhSachMonAnOrder.concat(monAnObj)
//         },()=>{
//             console.log("state "+ JSON.stringify(this.state.DanhSachMonAnOrder))
//         })
//     }





    componentDidMount(){
    
        // this.LayIpServer();
        // this.LayMaQuanAn();
        // this.LayThongTinQuanAn(1);
        // console.log("ip la" + this.state.IpServer)
       this.LoadThongTin();
      
    };

    componentWillUnmount(){
        this.setState({
            text:"",
            ThongTinQuanAn:{},
            Loading:true,
            DanhSachLoaiMonAn:"",
            DanhSachMonAn:"",
            DataSourceDanhSachMonAn:"",
            SearchBarHeight:0,
            SearchButton:"🔍",
            LoaiMonAnDuocChon:"",
            Color:"black",
            ChonTatCa:true,
            modalVisible:false,
            MonAnDuocChon:{},
            DanhSachMonAnOrder:[],
            SoLuongCuaMon:"",
        })
    }


    TimKiem(text)
    {
        const newData = this.state.DanhSachMonAn.filter(function(item){
            const itemData = item.TenMonAn.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            DataSourceDanhSachMonAn:newData,
            text:text
        })
}





GoiMon(){
    //  this.socket.emit("quan1-ban1-goimon",JSON.stringify(this.state.DanhSachMonAnOrder));

    // // console.log("=================================")
    // // console.log(this.state.DanhSachMonAnOrder)
    // fetch(`${DefaultIP}goimon`,{
    //     method:'POST',
    //     body: 'data='+JSON.stringify(this.state.DanhSachMonAnOrder)+`&MaQuanAn=${defaultQrMaQuan}&MaBan=${defaultQrMaBan}`,
    //     headers:{
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // }
this.setState({
    modalVisible:true
})


    // ).
    // then((response)=>
    // //  response.json()
    // console.log(response)
    // ).
    // then((responseJson) => {
    // this.setState(
    //     {
    //         DanhSachMonAn:responseJson,
    //         DataSourceDanhSachMonAn:responseJson,
    //         // Loading:false,
    //     },()=>{
    //         console.log(this.state.DanhSachMonAn)
    //               }
    //     );
    // console.log("tra ve khi order" + responseJson);
    // }
// )


}

    render(){
    if(this.state.Loading === true){
        return(
            <ActivityIndicator></ActivityIndicator>
        );
    }
    if(
        this.state.Loading === false && !this.state.ThongTinQuanAn
    ){
        return(
            <View style={{paddingTop:50}}>
                <Text> Không tìm thấy quán ăn . . .</Text>
            </View>
        );
    }
    return(


 <View style={{flex:1}}>
 
<ScrollView>

 <View>
 
  <Dialog
    visible={this.state.modalVisible}
    onTouchOutside={() => {
      this.setState({ modalVisible: false });
    }}
    height={400}
    dialogTitle={<DialogTitle title="Gọi Món" />}
    keyExtractor={(item, index) => index.toString()}
    >
    <DialogContent>
     <View style={{width:Dimensions.get("screen").width-100,flex:1,height:200}}>
      {/* <ScrollView> */}
       <View>
        <FlatList
        style={{paddingTop:20}}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        extraData={this.state}
        height={250}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        data={this.state.DanhSachMonAnOrder} 
        renderItem={({item}) => 
        <View style={{flexDirection:'row',flex:1, borderBottomWidth:3, paddingBottom:10}}>
         <View>
          <Image
            style={{width:100,height:100}}
            source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}} 
           />
         </View>
        <View style={{paddingLeft:10,paddingTop: 15}}>
         <Text>{item.TenMonAn}</Text>
         <Text>Số lượng: {item.SoLuong}</Text>
         <Text>Giá tiền {item.GiaTien * item.SoLuong}</Text>
         </View> 
        </View>}
        />
        </View>
         <View style={{paddingTop:8, flexDirection:'row'}}>
          <View style={{flex:1}}>
           <Button
            title="Gọi món"
            onPress={()=>{
            this.socket.emit("quan1-ban1-goimon",JSON.stringify(this.state.DanhSachMonAnOrder));
            // console.log(this.state.DanhSachMonAnOrder)
            fetch(`${DefaultIP}goimon`,{
            method:'POST',
            body: 'data='+JSON.stringify(this.state.DanhSachMonAnOrder)+`&MaQuanAn=${defaultQrMaQuan}&MaBan=${defaultQrMaBan}`,
            headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            }
            }).then(
                this.setState({
                    modalVisible:false,
                })
        ).then( () => {
            this.setState({
                DanhSachMonAnOrder:[]
            })
            Alert.alert('Gọi món thành công!')
        }
        )
            }}
            />
            </View>
            <View style={{flex:1}}>
            <Button
            title="Hủy"
            onPress={()=>{
                this.setState({
                    modalVisible:false
                })
            }}
            />
            </View>
           </View>
        {/* </ScrollView> */}
         </View>
    </DialogContent>
  </Dialog>
    </View>
     <View style={styles.container}>
         
         {/* <View style={styles.Top}>
            <View style={styles.LeftTop}>
                        <Image
                        style={styles.IMG}
                        source={{uri:`${DefaultIP}open_image?image_name=${this.state.ThongTinQuanAn.Avatar}`}} 
                        />
                   </View>
                   <View style={styles.RightTop}>
                       <View style={styles.RightTop1}>
                           <Text 
                               style={{fontSize:25,fontWeight:"bold"}}>
                               {this.state.ThongTinQuanAn.TenQuanAn}
                           </Text>
                       </View>
                       <View style={styles.RightTop2}>  
                       <TouchableOpacity onPress={()=>{
                           this.GoiDienThoai();
                       }}>
                        <Text 
                            style={styles.text}>Hotline:
                            {this.state.ThongTinQuanAn.SoDienThoai}
                        </Text>
                        </TouchableOpacity>
                        <Text 
                               style={styles.text}>Open:
                               {this.state.ThongTinQuanAn.GioMoCua} - Closed:
                               {this.state.ThongTinQuanAn.GioDongCua}
                            </Text>
                        <Text 
                            style={styles.text}>Địa chỉ:
                            {this.state.ThongTinQuanAn.MaDiaChi}
                        </Text>
                            
                       </View>                    
                   </View>    
               </View> */}
                <View style={styles.Top}>
            {/* <View style={styles.LeftTop}> */}
                <Image
                style={styles.IMG}
                source={{uri:`${DefaultIP}open_image?image_name=${this.state.ThongTinQuanAn.Avatar}`}} 
                />
            {/* </View> */}
            <View style={styles.RightTop}>
                {/* <View style={styles.RightTop1}> */}
                    <Text 
                        style={{fontSize:25,fontWeight:"bold"}}>
                        {this.state.ThongTinQuanAn.TenQuanAn}
                    </Text>
                {/* </View> */}
                {/* <View style={styles.RightTop2}>   */}
                <TouchableOpacity onPress={()=>{
                    this.GoiDienThoai();
                }}>
                <Text 
                    style={{fontSize:13}}>Điện Thoại:
                    {this.state.ThongTinQuanAn.SoDienThoai}
                </Text>
                </TouchableOpacity>
                <Text 
                        style={{fontSize:13}}>Giờ mở cửa:
                        {this.state.ThongTinQuanAn.GioMoCua}AM - 
                        {this.state.ThongTinQuanAn.GioDongCua}PM
                    </Text>
                <Text 
                    style={{fontSize:13}}>Địa chỉ:
                    {this.state.ThongTinQuanAn.So} {this.state.ThongTinQuanAn.Duong} {this.state.ThongTinQuanAn.Phuong} {this.state.ThongTinQuanAn.Quan} {this.state.ThongTinQuanAn.ThanhPho}
                </Text>
                    
                {/* </View>                     */}
            </View>    
        </View>
               <View style={styles.Mid}>
                 <View style={styles.MidTop}>
                   <View style={styles.MidTopLeft}>
                       
                  

                   </View>

                     {/* <View style={styles.MidTopRight}>
                       <View><Text>GGMap</Text></View>
                      
                   </View> */}
                 </View>

                 <View style={styles.MidMid}>
                 

                   <View style={{borderBottomWidth:0.4}}>
                   {/* <ScrollView> */}
                    {
                    
                     <View>
                         <Text style={{fontSize:20,fontWeight:'bold'}}>
                             Mô tả quán ăn
                         </Text>
                       <Text style={styles.text1}>
                        {this.state.ThongTinQuanAn.MoTaQuanAn}
                       </Text>
                    </View>
                     
                    }
                    {/* </ScrollView> */}
                     </View>
                 </View>
                 {/* <View style={styles.MidBottom}><Text style={styles.ratting}>Rating</Text></View> */}
               </View>

               <View style={styles.Bottom}>
                 <View style={styles.BottomTop}>  
            <View style={{flex:17}}>      
            <TouchableOpacity
            onPress={()=>{
                    this.ChonTatCa();
                    // this.LocMonAn();
            }}>         
                <Text style={{ textAlign:'center',
                    fontSize:20,
                    paddingTop:10,
                    color: this.state.ChonTatCa === true ? 'red' : 'black'
                    }}
                >
                    Tất Cả</Text>
                </TouchableOpacity>
                    </View>
                    
            <View style={{flex:73}}>
                <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={this.state.DanhSachLoaiMonAn} 
                renderItem={({item}) => 
                <View style={styles.container2}>
                
                  <TouchableOpacity 
                  onPress={
                      ()=>{
                        this.setState({
                            LoaiMonAnDuocChon:item.MaLoaiMonAn,
                            ChonTatCa:false
                        },
                        ()=>{ 
                            console.log("lmadc" + this.state.LoaiMonAnDuocChon)
                            // this.LocMonAn();
                            this.LocMonAn(item.MaLoaiMonAn);
                        })
                       }}>
                        <Text style={{
                                textAlign:'center',
                                fontSize:20,
                                paddingTop:10,
                                color: (this.state.ChonTatCa === false) && (item.MaLoaiMonAn === this.state.LoaiMonAnDuocChon) ? 'red' : 'black' ,

                        }}>{item.TenLoaiMonAn}</Text>
                        </TouchableOpacity>
                </View>
                }  
                />
                </View >
                <View style={{flex:10,paddingRight:0}}>
                
                <TouchableOpacity
                onPress={()=>{
                    this.ToggleSearchBar();
                }}
                >
                <Text style={{fontSize:30}}>{this.state.SearchButton}</Text>
                </TouchableOpacity>

                </View>
         
                
            </View>
            <View style={{marginTop:-10,height:this.state.SearchBarHeight}}>  

                <SearchBar 
                lightTheme
                onChangeText={(text)=>{this.TimKiem(text)}}
                value={this.state.text}
                onClear={()=>{

                }}
                placeholder='Tìm kiếm'
                // cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
                </View>

                  <View style={styles.BottomBottom}> 
                            <FlatList
                              keyExtractor={(item, index) => index.toString()}
                              extraData={this.state}
                            horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.DataSourceDanhSachMonAn} 
                        renderItem={({item}) => 
                            <View style={styles.container1}>
                            <TouchableOpacity
                            onPress={() => {
                                this.ClickFoodImage(item);
                            }}
                            >
                                <View style={styles.PositionIMG}>
                                    <ImageBackground style={{
                                             width:Dimensions.get('screen').width/2 - 3,
                                             height:Dimensions.get('screen').width/2 - 3,
                                            // backgroundColor:''
                                            // backgroundColor:  (this.state.MonAnDuocChon.MaMonAn == item.MaMonAn) ? 'black' : 'white'
                                            // opacity: (this.state.MonAnDuocChon.MaMonAn == item.MaMonAn) ? 0.2 : 1
                                    }} 
                                    source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}}>
                                <View style={{
                                    paddingTop:10,
                                flex:1,
                                backgroundColor:  (this.state.MonAnDuocChon.MaMonAn == item.MaMonAn) ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0,0,0,0)'    
                                }}>
                                    <Text style={{fontSize:20,color:'black'}}>{
                                        (this.state.MonAnDuocChon.MaMonAn == item.MaMonAn) ? this.state.MonAnDuocChon.GioiThieuMonAn : ""                            
                                        }</Text>
                                        
                                        <View style={{flexDirection:'row',justifyContent: 'center',paddingLeft:20,paddingRight:20}}>

                                        <TouchableOpacity onPress={()=>{
                                            this.BotMonOrder(item)
                                        }}>
                                            <Text style={{fontSize:80,padding:this.state.MonAnDuocChon.MaMonAn == item.MaMonAn && this.state.SoLuongCuaMon > 0 ? 10 : 0}}>
                                            {(this.state.MonAnDuocChon.MaMonAn == item.MaMonAn && this.state.SoLuongCuaMon > 0 ) ?  "-" : ""}
                                            </Text>
                                        </TouchableOpacity>


                                        <Text style={{fontSize:80,padding:this.state.MonAnDuocChon.MaMonAn == item.MaMonAn && this.state.SoLuongCuaMon > 0 ? 10 : 0}}>
                                        {(this.state.MonAnDuocChon.MaMonAn == item.MaMonAn && this.state.SoLuongCuaMon >0) ? this.state.SoLuongCuaMon:""}
                                        </Text>

                                        <TouchableOpacity onPress={()=>{
                                            //Tìm mã món, nếu chưa có, thêm vào mảng, có rồi thì ++ 
                                            this.ThemMonOrder(item)
                                                }
                                            }
                                            >
                                            <Text style={{
                                                fontSize:80,padding:this.state.MonAnDuocChon.MaMonAn == item.MaMonAn && this.state.SoLuongCuaMon > 0 ? 10 : 0
                                            
                                            }}>
                                            {(this.state.MonAnDuocChon.MaMonAn == item.MaMonAn) ?  "+" : ""}
                                            </Text>
                                        </TouchableOpacity>
                                        </View>
                                </View>
                                
                                </ImageBackground>
                                </View>
                                </TouchableOpacity>
                                <View style={styles.PositonText}>
                                <Text>{item.TenMonAn}</Text>
                                {/* <Text>{item.MaMonAn}</Text> */}
                                </View>
                            </View>
                        }  
                        />

                    <View>

                        {/* <View style={{paddingTop:10}}>
                            <Text style={{fontSize:25,fontWeight:"bold"}}>
                            {(!this.state.DanhSachMonAnOrder) ? "GOI" : "KHONG GOI" }
                            </Text>
                        </View> */}
                      <FlatList
                        style={{paddingTop:20}}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={false}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.DanhSachMonAnOrder} 
                        renderItem={({item}) => 
                        <View>
                            <View style={{flexDirection:'row', paddingLeft:145}}>
                                <View style={{paddingRight:50}}><Text>Số lượng</Text></View>
                                <View><Text>Giá tiền</Text></View>   
                            </View>
                            <View style={{flexDirection:'row'}}>
                                
                                <View>
                                    <Image
                                    style={{width:100,height:100}}
                                    source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}} 
                                    />
                                    <Text>{item.TenMonAn}</Text>
                                </View>
                                <View style={{paddingTop:30 ,paddingLeft:60, flexDirection:'row'}}>
                                    <View style={{paddingLeft:10}}>
                                        <Text>
                                        {item.SoLuong}         
                                        </Text>
                                    </View>
                                    <View style={{paddingLeft:70}}>
                                        <Text>
                                            {(item.GiaTien * item.SoLuong  + "đ").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                </View>
            
                            </View>
                        </View>
                }
                />

             
      </View>
     </View>     
 </View>         

    </View>      
        
    </ScrollView>

    <View style={{
     height: (Object.keys(this.state.DanhSachMonAnOrder).length == 0) ? 0:150
        }}> 
    <Button title="Gọi món"

    onPress={()=>{
    this.GoiMon();
    }}
    />
    </View>
    
    </View>                
   );
 }
}



const styles = StyleSheet.create({
    container:{
    
        flex:1,
       backgroundColor:'white'
    },
 
    container1:{
     flex:1,
        // borderBottomWidth:1,
        // borderRightWidth:1,
        marginHorizontal:1,
        // backgroundColor:'skyblue',
    },container2:{
        flex:1,
        // borderBottomWidth:0.4,
        // borderRadius:5,
           // borderBottomWidth:1,
           // borderRightWidth:1,
        //    marginHorizontal:1,
        //    backgroundColor:'skyblue',
        //    alignItems:'center',
           paddingHorizontal:3,
           backgroundColor:"transparent",
        //    paddingTop:3,
        //    width:50,

       },
       
    
 
 PositionIMG: {
     flex:1,
     alignItems:'center',
   
 },
 IMG1: {
     width:Dimensions.get('screen').width/2 - 3,
     height:Dimensions.get('screen').width/2 - 3,
 
  },
 PositonText:{
     flex:1,
    alignItems:'flex-start',
    paddingLeft:10,
 },
 PositonText2:{
    flex:1,
   alignItems:'center',
   paddingLeft:10,
},

 
 
 
 
    Top:{
        height:150,
        flex:2,
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:0.4,

    },
    LeftTop:{
        flex:1.7,
         borderRadius:5,
         alignItems:'center',
  
     },
 
    RightTop:{
         flex:3,
        backgroundColor:'white',
        alignItems:'baseline',
    },
    RightTop1:{
         flex:3,
        //  backgroundColor:'black',
      
         
        },
    RightTop2:{ 
        flex:1,
        // backgroundColor:'green',
         flexDirection:'column',
        // textAlign:'right'
        justifyContent:'flex-end',
        paddingLeft:5,
        alignItems:'flex-start'
        },

    LoaiMon:{ 
        textAlign:'center',
        fontSize:20,
        paddingTop:10,
        // color:// if(index == )
    },
    

    
    Time:{

        fontSize:15,
        textAlign:'right'
        
    },
 
 
    Mid:{
    
        flex:1.6,
        // backgroundColor:'blue',
    },
    MidTop:{ 
        flex:1,borderRadius:4, 
        // backgroundColor:'pink', 
        flexDirection:'row' },
    MidTopLeft:{
        flex:2, 
        // backgroundColor:'red',

    },
    MidTopRight:{
        flex:1,
        // backgroundColor:'yellow',

    },
 
    MidMid:{ 
        flex:4.5,
        borderRadius:4, 
        // backgroundColor:'white',
     },
    MidBottom:{
         flex:1,
         borderRadius:4, 
        //  backgroundColor:'red',

         },
 
    text:{
    fontSize:15,
    },
 
    text1:{
    fontSize:15,
    },
 
    ratting:{
    fontSize:20,
    },
 
    Bottom:{
        
        flex:2,
        // backgroundColor:'yellow',
    },
    BottomTop:{
        // flex:2,
        // backgroundColor:'blue',
        flex:1,
        flexDirection:'row',
        height:50,
    },
    BottomBottom:{
        flex:5,
        borderRadius:2,
        backgroundColor:'white',
    },
    
    IMG:{
      height: 150,
      width:150,
    
    //   borderRadius:6
    },
 
 
    TenQuanAn:{
        fontSize : 35,
        padding:8,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        // color:'blanchedalmond',
        fontWeight:'bold'
    },
 
 
    textInput:{
        fontSize:15, 
        justifyContent:'center',
         padding:10,
        color:'antiquewhite',
        fontStyle:'italic',
    },
 });
 




 