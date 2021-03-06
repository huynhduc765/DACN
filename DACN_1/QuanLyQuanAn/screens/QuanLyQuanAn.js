import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Text,View,Alert,AsyncStorage,Button,ScroolView,ListView,ActivityIndicator,StyleSheet,TouchableHighlight,Image,DeviceEventEmitter} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements'

import { DefaultAccount,
    DefaultIP,
    setDefaultAccount,
    DefaultMaQuanAn,
    setDefaultMaQuanAn,
    defaultDanhSachMonAn,
    setdefaultDanhSachMonAn,
    DefaultMaMonAn,
    setDefaultMaMonAn,
    defaultSoLuongBan,
    setDefautlSoLuongBan,
} from './DefaultValue'



const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class QuanLyQuanAn extends React.Component {
static navigationOptions = ({ navigate, navigation }) => ({
    title: "Danh Sách Quán Ăn",
    headerRight: (
    <View>
    <Button title="Thêm" onPress={()=>{ navigation.navigate('TaoQuanAn'); }} />
    </View>
  
    ),
});


    constructor(props){
      super(props);
      this.state={
        TenTaiKhoan:null,
        Loading:true,
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        DanhSachQuanAn:null,
        dataSource:null,
        text:''
      }
    };



LayDanhSachQuanAn(){
    fetch(`${DefaultIP}LayDanhSachQuanAn`,{
        method:'POST',
        body:`TenTaiKhoan=${DefaultAccount}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    }).then((response)=> response.json()).then((responseJson) => {
       this.setState(
           {
               DanhSachQuanAn:responseJson,
               Loading:false,
               dataSource: ds.cloneWithRows(responseJson)
           }
        );
    }
)
};
ThemQuanAn(){
    this.props.navigation.navigate('TaoQuanAn');
}

componentWillMount(){
    this.LayDanhSachQuanAn();
    DeviceEventEmitter.addListener('reloadTaoQuanAn', (e)=>{
      this.LayDanhSachQuanAn();
    })
};


componentDidMount(){
 

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
render(){
    if (this.state.Loading == true) {
        return (
          <ActivityIndicator
            animating={true}
            size="large"
          />
        );
      }
     if(this.state.DanhSachQuanAn == []){
          return(
                <View>
                    <Text>
                        Danh sách quán ăn trống!
                    </Text>
                </View>
          );
      }
    return(
        <View style={{flex:1
        // ,backgroundColor:'black'
        }}>
          <SearchBar
            // darkTheme
            lightTheme
            onChangeText={(text)=>{this.TimKiem(text)}

         

            }            value={this.state.text}

            value={this.state.text}
            onClear={()=>{

            }}
            placeholder='Tìm Kiếm'
            cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />
        {/* {this.state.DanhSachQuanAn &&  */}
     <ListView 
        // dataSource={this.dataSource.cloneWithRows(this.state.DanhSachQuanAn)}
        
        dataSource = {this.state.dataSource}
          renderRow={(rowData,sectionID, rowID, highlightRow)=>
            <TouchableHighlight onPress={
                () => {
                    setDefaultMaQuanAn(rowData.MaQuanAn);
                    setDefautlSoLuongBan(rowData.SoLuongBan);
                    this.props.navigation.navigate('ChiTietQuanAn');
                }}
            >
              <View style={styles.container}>
                  <View style={styles.container2}>
                     <View style={styles.Mid}>
                             <Image  style={{width:100,height:100, borderRadius:5,marginRight:10,marginTop:10}} 
                             source={{uri:`${DefaultIP}open_image?image_name=${rowData.Avatar}`}} />
                             <View style={{ width: 0,flexGrow: 1,marginLeft: 0,}}>
                             
                                {/* <View style={styles.LocationName}> */}
                                    <Text style={styles.Name}>{rowData.TenQuanAn}</Text>
                                {/* </View> */}
                                <View style={{flexDirection:"column"}}>
                                <Text style={{fontSize:18}}>Điện Thoại: {rowData.SoDienThoai}</Text>
                                    <Text style={{flexWrap: "wrap",fontSize:18}}>Địa chỉ: {rowData.So} {rowData.Duong} {rowData.Phuong} {rowData.Quan} {rowData.ThanhPho}</Text>
                                </View>
                             
                             </View>         
                     </View>
               </View>
              </View>
              </TouchableHighlight>
          }
          enableEmptySections={true}
          />
        {/* } */}
        </View>
    );
}
}














    // ThemQuanAn(){
    //     fetch(${DiaChiDefaultIP}ThemQuanAn,{
    //         method:'POST',
    //         body:`TenTaiKhoan=${this.state.TenTaiKhoan}&TenQuanAn=${this.state.MatKhau}`,
    //         headers:{
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //           }
    //     }).
    //     then((response)=> response.json()).
    //     then((responseJson) => {
    //        this.setState(
    //            {
    //                TraVe:responseJson,
    //            },
    //            () => {
    //                 if (this.state.TraVe.status == 'true'){
    //                     this.ChuyenDenManHinhChinh();
    //                     this._storeData();
    //                 }else{
    //                     Alert.alert(Đăng nhập thất bại);
    //                 }
    //             }
    //         )
    //     }
    // )
    // };
    
const styles = StyleSheet.create({
    container:{
    
        flex:1,
        justifyContent:'flex-start',
        height:120,
        borderBottomWidth:1,
    },
 
    container2:{
        flex:0.95,
        // backgroundColor:'blanchedalmond',
    },
    Mid:{
    
        flex:1,
        flexDirection:'row'

    },

    IMG:{ flex:1,borderRadius:5},
    MoTaNgan:{ flex:2, 
        // backgroundColor:'blanchedalmond',
         borderRadius:3},
    LocationName:{flex:1},
    Loading:{flex:1},
    Name:{
        fontSize : 30,
        justifyContent:'space-around',
        fontWeight: 'bold'
    },
    text:{
        fontSize: 20,
    },
    
});