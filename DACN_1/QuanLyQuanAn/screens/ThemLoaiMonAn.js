import React from 'react';
import {Text,View,Alert,AsyncStorage,Button,ScrollView,ListView,ActivityIndicator,StyleSheet,Picker,TouchableOpacity} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import {DefaultIP, DefaultAccount,setDefaultAccount} from './DefaultValue';



export default class ThemLoaiMonAn extends React.Component {
    static navigationOptions ={
        title:"Loai mon an",
        headerRight: (
            <View>
            <Button title="Them"
            onPress={ () => {
                // this.showDialog
                console.log("press")
            }
            }
            />
            </View>
        )
}


    constructor(props){
      super(props);
      this.state={
            MaQuanAn:"",
            dialogVisible: false,
            LoaiMonAn:"",
            TraVe:"",
            Loading:"",
            IpServer:"",
            DanhSachLoaiMonAn:{},
          };
          this.dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
          });
        }
          showDialog = () => {
            this.setState({ dialogVisible: true });
          };
        
          handleCancel = () => {
            this.setState({ dialogVisible: false });
          };
    
       
          
        
LayDanhSachLoaiMonAn(DefaultDefaultDefaultIP,MaQuanAn){
    fetch(`${IP}LayDanhSachLoaiMonAn`,{
        method:'POST',
        body:`DefaultMaQuanAn=${MaQuanAn}`,
        // body:`TenTaiKhoan=${this.state.TenTaiKhoan}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            }
    }).
    then((response)=> response.json()).
    then((responseJson) => {
        this.setState(
            {
            DanhSachLoaiMonAn:responseJson,
            },()=>{
                console.log(responseJson)
                this.setState({
                    Loading:false,
                });
            }
        )
    }
    )
    };

GuiRequest(IP,MaQuanAn,LoaiMonAn){
    fetch(`${IP}ThemLoaiMonAn`,{
        method:'POST',
        body:`MaQuanAn=${MaQuanAn}&TenLoaiMonAn=${LoaiMonAn}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    }).
    then((response)=> response.json()).
    then((responseJson) => {
       this.setState(
           {
               TraVe:responseJson,
               Loading:true,
           },()=>{
               console.log(responseJson);
            //    Alert.alert(`${this.TraVe}`)
           }
        );
    }
)
};


    TaoLoaiMonAn = () => {

    
    console.log(`ip ${this.state.IpServer} ma quan an : ${this.state.MaQuanAn} ten loai mon an ${this.state.TenLoaiMonAn}`);
    var ip = this.state.IpServer;
    var mqa = this.state.MaQuanAn;
    var tlma = this.state.TenLoaiMonAn;

    this.GuiRequest(ip,mqa,tlma);
    this.setState({ dialogVisible: false });
    };

LayIpServer(){
AsyncStorage.getItem('IpServer').then((value) => {
    if (value != null){
        this.setState({
            IpServer:value,
        });
        }
    }
)};


LayMaQuanAn(){
    return this.props.navigation.getParam('MaQuanAn')
};


componentWillMount(){
    // this.setState({
    //     MaQuanAn:mqa,
    // });
    this.LayIpServer();
    var mqa = this.LayMaQuanAn();
    this.setState({
        MaQuanAn:mqa,
    });

    
    
    
    
};
componentDidMount(){

    this.LayDanhSachLoaiMonAn(this.state.IpServer,this.state.MaQuanAn);
  
}
render(){
    return(
    <View style={styles.container}>
       <View>
            <Text>Danh sach</Text>
            </View>
        <View>
            <Button title="Them Loai"
            onPress={
            
                    this.showDialog
            }
            />
        </View>
        
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Tạo Món Ăn</Dialog.Title>
          <Dialog.Description>
            Nhập tên loại món ăn.
          </Dialog.Description>
          <Dialog.Input onChangeText={(text)=>{
              this.setState({
                  TenLoaiMonAn:text,
              },()=>{
                  console.log("ten loai mon an " + this.state.TenLoaiMonAn)
              });
    }}
          value = {this.state.TenLoaiMonAn}  />
          <Dialog.Button label="Huỷ" onPress={this.handleCancel} />
          <Dialog.Button label="Tạo" onPress={this.TaoLoaiMonAn} />
        </Dialog.Container>



<View>
        {this.state.DanhSachLoaiMonAn && 
     <ListView 
        dataSource={this.dataSource.cloneWithRows(this.state.DanhSachLoaiMonAn)}
        
          renderRow={(rowData,sectionID, rowID, highlightRow)=>
            <TouchableHighlight onPress={
                () => {
                    // console.log("MaQuanAn la" + rowData.TenLoaiMonAn);
                    // this.props.navigation.navigate('ChiTietQuanAn',{
                    //     MaQuanAn:rowData.MaQuanAn
                    //     });
                }}
                underlayColor='gray'
            >
              <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',height:50,borderBottomWidth:0.3}}
              >
                <Text style={{fontSize:20}}>{rowData.TenLoaiMonAn}</Text>
              </View>
              </TouchableHighlight>
          }
          enableEmptySections={true}
          />
        }
        </View>



    </View>

    );
}
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    viewNho:{
        flex:1,
        borderWidth:0.3,
        borderColor:'black'
    },
    text:{
        fontSize:30,
    }
})




