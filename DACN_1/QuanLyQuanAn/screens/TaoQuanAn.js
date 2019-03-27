import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Text,View,
    Alert,
    AsyncStorage,Button,
    TextInput,
    Image,
    Formdata,
    StyleSheet,
    ActivityIndicator,
    ImageBackground ,
    DeviceEventEmitter
} from 'react-native';
import { createStackNavigator,NavigationActions } from 'react-navigation';
import { ImagePicker,Camera, Permissions  } from 'expo';
import {Avatar,FormInput,FormLabel} from 'react-native-elements';
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';



export default class TaoQuanAn extends React.Component {
    static navigationOptions = {
        title: `Tạo Quán Ăn`,
      };

    constructor(props){
      super(props);
      this.state={
        TenTaiKhoan:"",
        TraVe:"",
        TenQuanAn:"",
        GioiThieuQuanAn:"",
        DisableNutTao:true,
        Image:'',
        RespondImage:"",
        SoDienThoai:"",
        Mota:"",
        GioMoCua:"",
        GioDongCua:"",
        Blur:false,
        SoLuongBan:'',
      }
    };


KiemTraInput(){
//     var TenQuanAn = this.state.TenQuanAn;
//     var Image = this.state.Image
//     // console.log("State la " + this.state.TenQuanAn)
//   if ((TenQuanAn != "") && (Image != "")){
//     this.setState({
//         DisableNutTao:false,
//     });
//   }
//   else{
//       this.setState({
//           DisableNutTao:true,
//       });
//   }
// this.setState({
//     DisableNutTao : false
// })
console.log(this.state.Image)
console.log("state")
console.log(`${this.state.TenQuanAn} ${this.state.GioiThieuQuanAn} ${this.state.SoLuongBan} ${this.state.SoDienThoai} ${this.state.GioDongCua} ${this.state.GioMoCua}`);
console.log("============")
if (this.state.TenQuanAn && this.state.GioiThieuQuanAn && this.state.SoLuongBan && this.state.SoDienThoai && this.state.GioMoCua && this.state.GioDongCua){
    return true
}
else{
    return false
}



};


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

      };

      componentDidMount(){
          console.log("state la "  + DefaultIP + " === " + DefaultAccount)
        this.QuyenCamera();
      }




 
      TaoQuanAn(){
        fetch(`${DefaultIP}TaoQuanAn`,{
            method:'POST',
            body:`TenTaiKhoan=${DefaultAccount}&TenQuanAn=${this.state.TenQuanAn}&Avatar=${this.state.RespondImage}&GioMoCua=${this.state.GioMoCua}&GioDongCua=${this.state.GioDongCua}&SoDienThoai=${this.state.SoDienThoai}&MoTa=${this.state.Mota}&SoLuongBan=${this.state.SoLuongBan}`,
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
                        //  this.ChuyenDenManHinhChinh();
                        //  this._storeData();
                        DeviceEventEmitter.emit('reloadTaoQuanAn',  {});
                        Alert.alert('Tạo Quán Ăn Thành Công!');
                        // this.goBack('QuanLyQuanAn');
                        this.props.navigation.dispatch(NavigationActions.back());
                     }else{
                         Alert.alert(`Tạo quán ăn thất bại!`);
                     }
                 }
             )
        }
    )
};
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
      this.setState({
          DisableNutTao:true
      })

    // if ( !this.state.Image){
    //     this.TaoQuanAn();
    //     return;
    // }

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
           this.TaoQuanAn();
       });
    })
        .catch(err => {
        console.log(err)
    })

};
render(){
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
        title="MT"
        source={{uri:`${this.state.Image.uri}`}}
        onPress={() => this._pickImage()}
        activeOpacity={0.7}
        />
        <View>
        <FormLabel>Tên quán ăn</FormLabel>
        <FormInput
        maxLength={20}
        autoFocus={false}
        placeholder=""
        style={styles.textInput}
        onChangeText={
        (text) => {
            this.setState(
                {
                TenQuanAn:text
                },()=>{
                this.KiemTraInput();
            });
        }
        }/>
        </View>
        </View>
        <FormLabel>Giới thiệu quán ăn</FormLabel>
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
                            GioiThieuQuanAn:text
                        },()=>{
                            this.KiemTraInput();
                        });
                }
            }
            multiline={true}/>   


            <FormLabel>Số Lượng Bàn</FormLabel>
            <FormInput
            onChangeText={(text)=>{
                    this.setState({
                        SoLuongBan:text
                    })
            }}
            value={this.state.SoLuongBan}
            keyboardType='number-pad'
            />
            <FormLabel>Điện thoại liên lạc</FormLabel>
            <FormInput
            autoFocus={false}
            placeholder=""
            style={styles.textInput}
            onChangeText={
            (text) => {
                this.setState(
                    {
                    SoDienThoai:text
                    },()=>{
                    this.KiemTraInput();
                });
                }
            }/>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
            <FormLabel>Giờ mở cửa</FormLabel>
                <FormInput
                autoFocus={false}
                placeholder=""
                style={styles.textInput}
                onChangeText={
                (text) => {
                    this.setState(
                        {
                        GioMoCua:text
                        },()=>{
                        this.KiemTraInput();
                    });
                    }
                }/>
            </View>
            
            <View style={{flex:1}}>
            <FormLabel>Giờ đóng cửa</FormLabel>

                <FormInput
                    autoFocus={false}
                    placeholder=""
                    style={styles.textInput}
                    onChangeText={
                    (text) => {
                        this.setState(
                            {
                            GioDongCua:text
                            },()=>{
                            this.KiemTraInput();
                        });
                        }
                    }/>
            </View>
            </View>
        </View>
    <View style={{paddingTop:20}}>
        <Button color='black' 
            title="Tạo Quán Ăn"
            disabled={false}
            onPress={
            ()=> {
            let kt = this.KiemTraInput();
            console.log(kt);
                if (kt == true){
                this._uploadImage()
                // this.TaoQuanAn()
                }
                else{
                    Alert.alert("Vui lòng nhập đầy đủ thông tin!");
                }
            }
        }
        />    
        </View>
    

</View>
        // </ImageBackground>
    );
}
}






const styles = StyleSheet.create({
    container:{
    
        flex:1,
   
        paddingTop:50,
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
        borderBottomColor:'green'
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


