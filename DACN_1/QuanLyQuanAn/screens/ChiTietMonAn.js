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
    FlatList,Linking} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {SearchBar} from 'react-native-elements';
import {DefaultAccount,DefaultIP,DefaultMaQuanAn, setdefaultDanhSachMonAn, } from './DefaultValue';
import {LottieView} from 'lottie-react-native';


   

export default class ChiTietMonAn extends React.Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Chi Tiết Món Ăn",
     
    });
    constructor(props){
        super(props);
        this.state={
        text:"",
        ThongTinQuanAn:{},
        ThongTinMonAn:{},
        Loading:true,
        DanhSachLoaiMonAn:{},
        DanhSachMonAn:{},
        DataSourceDanhSachMonAn:{},
        SearchBarHeight:0,
        SearchButton:"🔍",
        LoaiMonAnDuocChon:"",
        Color:"black",
        ChonTatCa:true,
        array:[
            {key: '1', TenMon:"Chien"},
            {key: '2', TenMon:"Chien"},
            {key: '3', TenMon:"Chien"},
            {key: '4', TenMon:"Chien"},
            {key: '5', TenMon:"Chien"},
            {key: '6', TenMon:"Chien"},
            {key: '7', TenMon:"Chien"},
            {key: '8', TenMon:"Chien"},
            {key: '9', TenMon:"Chien"},
            {key: '10', TenMon:"Chien"}
        ],
        }
    };

    ChonTatCa(){ 
            this.setState({
                ChonTatCa: true,
                DataSourceDanhSachMonAn:this.state.DanhSachMonAn
            })
            setdefaultDanhSachMonAn(this.state/DanhSachLoaiMonAn);
        
        
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



    ClickFoodImage(mma){
        if(mma==1){
            Alert.alert('mot','mot');
        }
        else{
            Alert.alert('hai','hai');

        }
    }
    LayDanhSachMonAn(){
        fetch(`${DefaultIP}LayDanhSachMonAn`,{
            method:'POST',
            body:`MaQuanAn=${DefaultMaQuanAn}`,
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
            body:`MaQuanAn=${DefaultMaQuanAn}`,
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
            body:`MaQuanAn=${DefaultMaQuanAn}`,
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

                console.log(this.state.DanhSachLoaiMonAn)
                
                // console.log(responseJson);
            }
            );
        }
    )
    };


    componentWillMount(){
        

    };


    componentDidMount(){
    
        // this.LayIpServer();
        // this.LayMaQuanAn();
        // this.LayThongTinQuanAn(1);
        // console.log("ip la" + this.state.IpServer)
       this.LoadThongTin();
      
    };
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
    render(){
    // if(this.state.Loading === true){
    //     return(
    //         <ActivityIndicator></ActivityIndicator>
    //     );
    // }
    return(
        <ScrollView>
        <View style={styles.container}>    

               <View style={styles.Top}>
                   <View style={styles.LeftTop}>
                        <Image
                        style={styles.IMG}
                        source={{uri:`${DefaultIP}open_image?image_name=${this.state.DanhSachMonAn.Avatar}`}} 
                        />
                   </View>
                   <View style={styles.RightTop}>
                       <View style={styles.RightTop1}>
                           <Text 
                               style={styles.TenQuanAn}>
                               {this.state.DanhSachMonAn.TenMonAn}
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
                        
                       </View>                    
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
                   <ScrollView>
                    {
                    
                     <View>
                         <Text style={{fontSize:20,fontWeight:'bold'}}>
                             Mô tả quán ăn
                         </Text>
                       <Text style={styles.text1}>
                        {this.state.DanhSachMonAn.GioiThieuMonAn}
                       </Text>
                    </View>
                     
                    }
                    </ScrollView>
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
                // darkTheme
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
                            <View style={styles.container1}
                        
                            >
                            <TouchableOpacity
                            onPress={() => {
                                this.ClickFoodImage(item.TenMonAn);
                            }}
                            >
                                <View style={styles.PositionIMG}>
                                    <Image style={styles.IMG1} 
                                    source={{uri:`${DefaultIP}open_image?image_name=${item.Avatar}`}}  />
                                </View>
                                </TouchableOpacity>
                                <View style={styles.PositonText}>
                                <Text>{item.TenMonAn}</Text>
                                {/* <Text>{item.MaMonAn}</Text> */}
                                </View>

                            </View>
                        }  
                        />
                    <Button onPress={()=>{
                        this.props.navigation.navigate('ThemMonAn');
                    }} 
                    title="Thêm Món Ăn"
                    />
                 </View>

               </View>         

        </View>      
   
       </ScrollView>
   );
 }
}



const styles = StyleSheet.create({
    container:{
    
        flex:1,
     //   backgroundColor:'red'
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
    fontSize:20,
    },
 
    text1:{
    fontSize:25,
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
        borderRadius:4,
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
 

