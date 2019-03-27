import React from 'react';
import { ScrollView, StyleSheet,View ,Button,TouchableOpacity,Text,Alert} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ImagePicker,Camera, Permissions,BarCodeScanner  } from 'expo';
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';
import QRCode from 'react-native-qrcode';
import  {setDefaultQr,defaultQrMaQuan,defaultQrMaBan} from './DefaultValue.js'
import NguoiDung_MenuChinh from './NguoiDung_MenuChinh'



export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Gọi Món',
  };


  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    qrData:'',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [1, 1],
    // });
    let result = await ImagePicker.launchCameraAsync({

    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ Image: result });
    }
    };

  componentWillMount(){
    const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{ 
    });
    const {statusCamera } = Permissions.askAsync(Permissions.CAMERA).then(() =>{
    });
  
  }
  handleBarCodeScanned = ({ type, data }) => {
    // if(data == this.state.qrData){
    //   return
    // }
    // else{
    // this.setState({
    //   qrData:data
    // },()=>{

    var tachData = data.split('-');
    var maQuan = tachData[0];
    var maBan = tachData[1];
    var xacThuc = tachData[2];


    // Alert.alert(xacThuc)
    if (xacThuc == "QuanLyQuanAn"){
      setDefaultQr(maQuan,maBan);
      // Alert.alert(`${data}`)
      // this.props.navigation.navigate('NguoiDung_XemQuanAn');
      this.props.navigation.navigate('NguoiDung_MenuChinh');
    }
    else{
      return;
    }
      // Alert.alert(`QR-Code`,
      // `Bar code with type ${type} and data ${data} has been scanned!

      // Ma quan la : ${maQuan}
      // Ma ban la : ${maBan}
      // `,
      // [
      //   {text:'NOPE',onPress:()=>{this.setState({qrData:''})}
      // }
      
      
      // ]);
  //   })
  // }
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      // Alert.alert('camera');
      console.log("access camera");
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <Button
        title="Test QR FALSE"
        onPress={()=>{
          setDefaultQr(0,0);
          // Alert.alert(`${data}`)
          // this.props.navigation.navigate('NguoiDung_XemQuanAn');
        }}
        />
        <Button
        title="Test QR TRUE"
        onPress={()=>{
          setDefaultQr(1,1);
          // Alert.alert(`${data}`)
          // this.props.navigation.navigate('NguoiDung_XemQuanAn');
          this.props.navigation.navigate('NguoiDung_MenuChinh')
        }}
        />
        </View>
    
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});