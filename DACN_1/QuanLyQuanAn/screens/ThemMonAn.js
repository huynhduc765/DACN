import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Text,View,
    Alert,
    AsyncStorage,
    TextInput,
    Image,
    Formdata,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Picker,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';
import { createStackNavigator,NavigationActions } from 'react-navigation';
import { ImagePicker,Camera, Permissions  } from 'expo';
import {Avatar,FormInput,FormLabel} from 'react-native-elements';
import { DefaultAccount,
    DefaultIP,
    setDefaultAccount,
    DefaultMaQuanAn,
    setDefaultMaQuanAn,
    defaultDanhSachMonAn,
    setdefaultDanhSachMonAn,
    DefaultMaMonAn,
    setDefaultMaMonAn,
    defaultMaLoaiMonAnDuocChon,
    setDefaultMaLoaiMonAnDuocChon,
    defaultTenLoaiMonAnDuocChon,
    setDefaultTenLoaiMonAnDuocChon} from './DefaultValue';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import Dialog from "react-native-dialog";




export default class ThemMonAn extends React.Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Thêm Món Ăn",

    });

    constructor(props){
        super(props);
        this.state={
          TenMonAn:"",
          GioiThieuMonAn:"",
          DisableNutTao:true,
          Image:'',
          RespondImage:"",
          LoaiMonAn:"",
          DanhSachLoaiMonAn:[],
          TenLoaiMonAnThem:"",
          dialogVisible: false,
          GiaTien:0,
          TraVe:"",
          MaLoaiMonAn:"",

        }
      };
  
      showDialog = () => {
        this.setState({ dialogVisible: true });
      };
    
      handleCancel = () => {
        this.setState({ dialogVisible: false });
      };
      handleDelete = () =>{
          this.setState({dialogVisible:false})
      }
    _ThemLoai = () => {
        this.setState({
            dialogVisible:true
        })
    }
    ThemLoaiMonAn = () => {
        // console.log("sate" + this.state.TenLoaiMonAnThem + DefaultMaQuanAn)
        fetch(`${DefaultIP}ThemLoaiMonAn`,{
            method:'POST',
            body:`TenLoaiMonAn=${this.state.TenLoaiMonAnThem}&MaQuanAn=${DefaultMaQuanAn}`,
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
                    this.LayDanhSachLoaiMonAn();
                    this.setState({
                        dialogVisible:false
                    })
                    // console.log("status tra ve" + this.state.TraVe[0])
                    // if (this.state.TraVe.status == 'true'){
                    //     //  this.ChuyenDenManHinhChinh();
                    //     //  this._storeData();
                    //     Alert.alert('Tạo Loại Món Ăn Thành Công');
                    //     // this.goBack('QuanLyQuanAn');
                    //     // this.props.navigation.dispatch(NavigationActions.back());
                    // }else{
                    //     Alert.alert(`Tạo Thất Bại`);
                    // }
                    

                }
            )
        }
    );

    }

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
                setdefaultDanhSachMonAn(responseJson);
                console.log(this.state.DanhSachLoaiMonAn)
                
                // console.log(responseJson);
            }
            );
        }
    )
    };
    async _selectLoaiMonAn() {
    let a =  await  setDefaultTenLoaiMonAnDuocChon(item.TenLoaiMonAn);
     let b = await   setDefaultMaLoaiMonAnDuocChon(item.MaLoaiMonAn);

     this.props.navigation.goBack();

    }
    
  
  KiemTraInput(){
    if (this.state.TenMonAn && this.state.GioiThieuMonAn && this.state.LoaiMonAn && this.state.GiaTien && this.state.Image){

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
  
  
    QuyenCamera() {
    const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{ 
    });
    const {statusCamera } = Permissions.askAsync(Permissions.CAMERA).then(() =>{
    });

// console.log(status)
// this.setState({ hasCameraPermission: status === 'granted' });
// const { uri } = await camera.takePictureAsync();
//  const asset = await MediaLibrary.createAssetAsync(uri);
};

    componentWillMount = () => {
        console.log("mount")
        this.setState({
            LoaiMonAn:defaultTenLoaiMonAnDuocChon
        })

    };

    componentDidMount(){
        this.QuyenCamera();
        console.log(defaultDanhSachMonAn);
        this.setState({
            DanhSachLoaiMonAn:defaultDanhSachMonAn
        })
    }
  
  
  
  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      // let result = await ImagePicker.launchCameraAsync({
  
      // });
  
      // console.log(result);
  
      if (!result.cancelled) {
        this.setState({ Image: result });
      }
      this.KiemTraInput();
    };
    _uploadImage(){
  
      // if ( !this.state.Image){
      //     this.TaoQuanAn();
      //     return;
      // }
      this.setState({
          DisableNutTao:true
      })
  
      var photo = {
          uri: `${this.state.Image.uri}`,
          type: 'image/jpeg',
          name: 'photo.jpg',
      };
      let formdata = new FormData();
  
      formdata.append('photo', photo);
      fetch(`${DefaultIP}upload_image`,{
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          body: formdata
      }).then((respond)=> respond.json())
          .then((resJson) => {
          console.log(resJson.imageName);
         this.setState({
             RespondImage:resJson.imageName
         },()=>{
             this.ThemMonAn();
         });
      })
          .catch(err => {
          console.log(err)
      })
  
  };

  ThemMonAn(){
      console.log(` \n \n ${this.state.GioiThieuMonAn}&
      TenMonAn=${this.state.TenMonAn}&
      MaLoaiMonAn=${this.state.MaLoaiMonAn}&
      Avatar=${this.state.RespondImage}&
      GiaTien=${this.state.GiaTien} `)
    fetch(`${DefaultIP}ThemMonAn`,{
        method:'POST',
        body:`GioiThieuMonAn=${this.state.GioiThieuMonAn}&TenMonAn=${this.state.TenMonAn}&MaLoaiMonAn=${this.state.MaLoaiMonAn}&Avatar=${this.state.RespondImage}&GiaTien=${this.state.GiaTien}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).
    then((response)=> response.json()).
    then((responseJson) => {
    this.setState(
        {
            TraVe:responseJson,
            // Loading:false,
        },()=>{
            // console.log("KEY VALUE \n");
            // result = Object.keys(this.state.DanhSachLoaiMonAn).map(k => ({ [k]: this.state.DanhSachLoaiMonAn[k] }));
            // setdefaultDanhSachMonAn(responseJson);
            console.log(this.state.TraVe)
            Alert.alert("Tạo Món Ăn Thành Công!")
            DeviceEventEmitter.emit('reloadThemMonAn',  {})
            // this.goBack();
            this.props.navigation.dispatch(NavigationActions.back());

            // console.log(responseJson);
        }
        );
    }
)
};



//   createData() {
//     return this.state.DanhSachLoaiMonAn.map( el => ({value: el.TenLoaiMonAn}));
//   }
  render(){
    // const data = this.createData();
      return(
          // <ImageBackground style={ styles.imgBackground }
          //          resizeMode='cover' 
          //          source={require('./IMG/background.jpg')}>
  
  <View style={styles.container}>
      <View>
          <View>
              <View style={{flexDirection:'row'}}>
                    <Avatar
                    large
                    // rounded
                    title=""
                    source={{uri:`${this.state.Image.uri}`}}
                    onPress={() => this._pickImage()}
                    activeOpacity={0.7}
                    />
                    <View>
                    <FormLabel>Tên món ăn</FormLabel>
                    <FormInput
                    maxLength={20}
                    autoFocus={false}
                    placeholder=""
                    style={styles.textInput}
                    onChangeText={
                    (text) => {
                        this.setState(
                            {
                            TenMonAn:text
                            },()=>{
                            this.KiemTraInput();
                        });
                    }
                    }/>
                    </View>
               </View >


                   <View>
                        <FormLabel>Giới thiệu món ăn</FormLabel>
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
                                            GioiThieuMonAn:text
                                        },()=>{
                                            this.KiemTraInput();
                                        });
                                }
                            }
                            multiline={true}/>   
                    </View>

                   <View style={{flexDirection:'row'}}>            
                        <View style={{flex:1.5}}>
                        <Dropdown
                        extraData={this.state}
                        
                        selectedItemColor="black"
                            // data={this.state.DanhSachLoaiMonAn.map( e => ({value: e.TenLoaiMonAn,
                            //     key:e.MaLoaiMonAn
                            // }))} 
                            data={this.state.DanhSachLoaiMonAn.map( e => ({value: e.TenLoaiMonAn,
                                key:e.MaLoaiMonAn
                            }))} 
                            // value={this.state.DanhSachLoaiMonAn.map(e=>({value:e.MaLoaiMonAn}))}
                            label="Chọn Loại Món Ăn"
                            onChangeText={(value, index, data)=>{
                        console.log("========")
                               
                        console.log(value + "\n" + index  + "\n");
                        console.log(JSON.stringify(data[index].key));
                        this.setState({
                            MaLoaiMonAn:data[index].key,
                        })
                            }}/>
                        </View>

                        <View style={{flex:1, paddingTop:15, backgroundColor:'transparent'}}>
                            <Button color="white"
                            title="Thêm loại" 
                            onPress={()=>{
                                this.setState({ dialogVisible: true });
                                // console.log("aa");
                            }}
                            />

                       </View>
                    </View> 


              </View>
              <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <FormLabel>Giá Tiền</FormLabel>
                        <FormInput
                        autoFocus={false}
                        placeholder="Giá Tiền"
                        style={styles.textInput}
                        onChangeText={
                        (text) => {
                            this.setState(
                                {
                                GiaTien:text
                                },()=>{
                                this.KiemTraInput();
                            });
                            }
                        }/>
                    </View>
              
                    <View style={{flex:1}}>
                    {/* <FormLabel>Giá khuyến mãi</FormLabel>
        
                        <FormInput
                            autoFocus={false}
                            placeholder="Nhập giá tiền KM"
                            style={styles.textInput}
                            onChangeText={
                            (text) => {
                                this.setState(
                                    {
                                    GiaTienKhuyenMai:text
                                    },()=>{
                                    this.KiemTraInput();
                                });
                                }
                            }/> */}
                    </View>
              </View>

              <View> 

                  <Button 
                  title="Tạo Món Ăn"
                  onPress={()=>{

                    if (this.KiemTraInput() == true){
                      this._uploadImage();
                    }
                    else{
                        this.ThongBaoChuaNhapDu();
                    }
                  }}
                  />
              </View>
          </View>
          
          <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Thêm Loại Món Ăn</Dialog.Title>
          {/* <Dialog.Description>
            Nhập tên loại món ăn
          </Dialog.Description> */}
          <Dialog.Input
          onChangeText={ (text) =>{
              this.setState({
                TenLoaiMonAnThem:text,
              },()=>{
                  console.log(this.state.TenLoaiMonAnThem)
              })
          }}
          value={this.state.TenLoaiMonAnThem}
          placeholder="Nhập tên loại món ăn"
          />
          <Dialog.Button
           disabled={(this.state.TenLoaiMonAnThem.length > 2) ? false:true} 
           label="Thêm" 
           color= {(this.state.TenLoaiMonAnThem.length > 2) ? 'blue':'gray'}
           onPress={this.ThemLoaiMonAn} 
           />
          <Dialog.Button 
          label="Huỷ" 
          color='red'
          onPress={this.handleCancel} 
          />
        </Dialog.Container>
      
  
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
  
  


