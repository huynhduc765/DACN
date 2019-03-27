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
import { createStackNavigator } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { SearchBar } from 'react-native-elements'

export default class Test extends React.Component {
    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Test",
        
    });
    
    constructor(props){
        super(props);
        this.state={
            array:[
               
                {key: '1', MaBan:"Chien"},
                {key: '2', MaBan:"Chien"},
                {key: '3', MaBan:"Chien"},
                {key: '4', MaBan:"Chien"},
                {key: '5', MaBan:"Chien"},
                {key: '6', MaBan:"Chien"},
                {key: '7', MaBan:"Chien"},
                {key: '8', MaBan:"Chien"},
                {key: '9', MaBan:"Chien"},
                {key: '10', MaBan:"Chien"},
                {key: '11', MaBan:"Chien"},
                {key: '12', MaBan:"Chien"},
                {key: '13', MaBan:"Chien"},
                {key: '13', MaBan:"Chien"},  
          

            ]
        }
    }
    render(){
 
    return(
     
        <View style={styles.container}>    

               <View style={styles.Top}>
                    <View style={styles.TopLeft}>
                            <Text style={{fontSize:20}}> Tất cả</Text>
                    </View>

                     <View style={styles.TopMid}>
                            <Text style={{fontSize:20}}>Co</Text>
                    </View> 

                     <View style={styles.TopRight}>
                     
                            <Text style={{fontSize:20}}>Rong</Text>    
                     </View>   

               </View>

                    <View style={{flex:1, paddingTop:10}}>
                        <FlatList
                        
                        data={this.state.array} //key ko dc trùng
                        renderItem={({item}) =>

                            <View style={styles.container1}>
                                <TouchableOpacity>
                                <View style={styles.PositionIMG}>
                                    <Image style={styles.IMG1} 
                                    source={require('./IMG/a1.jpg')} />
                                </View>

                        
                            
                                <View style={styles.PositonText}>
                                    <Text style={styles.MaBanAn}>{item.MaBan}</Text>
                                

                                </View>
                                </TouchableOpacity>
                            </View>
                        }  
                        horizontal={false} //muti colum
                         numColumns={3}                
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
    
    borderBottomWidth:1,
    borderRightWidth:1,
    backgroundColor:'skyblue',
    width:'33%',
    
   },

PositionIMG: {
    flex:1,
    alignItems:'center',
  
},
IMG1: {
    width:120,
    height:120,
   


 },
PositonText:{
    flex:1,
   alignItems:'center',
   
},




   Top:{
   
       flex:0.11,
       flexDirection:'row',
    alignContent:'space-between'
   },
   TopLeft:{ flex:1,backgroundColor:'red', alignItems:'center'},
   TopMid:{ flex:1,backgroundColor:'blue', alignItems:'center'},
   TopRight:{ flex:1,backgroundColor:'yellow', alignItems:'center'},


      


   MaBanAn:{
       fontSize : 15,
       padding:8,
       justifyContent:'center',
       alignItems:'center',
       alignContent:'center',
       color:'blanchedalmond',
       fontWeight:'bold'
   },
});



