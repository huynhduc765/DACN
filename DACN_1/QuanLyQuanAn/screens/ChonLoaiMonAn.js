import React from 'react';
import {Text,View,
    Alert
    ,Button,
    TextInput,
    Image,
    Formdata,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Picker,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {params,setParams,NavigationActions} from 'react-navigation'
import { 
    DefaultAccount,
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
    setDefaultTenLoaiMonAnDuocChon,
  
} from './DefaultValue';
import Dialog from "react-native-dialog";




export default class ChonLoaiMonAn extends React.Component {


    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Chọn Loại Món Ăn",
        headerRight: (
            <View>
            <Button title="Thêm Loại" onPress={ () => navigation.state.params.ThemLoai() } />
            </View>
          
            ),

    });
    constructor(props){
        super(props);
        this.state={
            abc:"aa",
            dialogVisible: false,
            TenLoaiMonAn:"",
            TenLoaiMonAnThem:"",
            Color:'gray',
            TraVe:'',
            DanhSachLoaiMonAn:'',
        }
    }
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
        console.log("sate" + this.state.TenLoaiMonAnThem + DefaultMaQuanAn)
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
    
    componentDidMount(){
        this.setState({
            DanhSachLoaiMonAn:defaultDanhSachMonAn
        });
        this.props.navigation.setParams({
            ThemLoai: this._ThemLoai
        });
    }

    render(){
        return(
            <View style={{flex:1}}>
            <FlatList
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.DanhSachLoaiMonAn} 
            renderItem={({item}) => 
                <TouchableOpacity 
                onPress={ async () => {
                    // this._selectLoaiMonAn()
                    let a =  await  setDefaultTenLoaiMonAnDuocChon(item.TenLoaiMonAn);
                    let b = await   setDefaultMaLoaiMonAnDuocChon(item.MaLoaiMonAn);
                    this.props.navigation.goBack();
                
                }}
                >
                    <View style={{height:50,padding:10,borderBottomWidth:0.3}}>
                    <Text style={{fontSize:25,color:item.TenLoaiMonAn == defaultTenLoaiMonAnDuocChon ? 'red':'black'}}>{item.TenLoaiMonAn}</Text>
                    </View>
                </TouchableOpacity>
                        }  
                />
    <View>
       
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
      </View>
      
        );
    }


}
