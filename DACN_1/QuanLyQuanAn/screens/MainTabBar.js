import React, { PureComponent } from 'react';
import {View,Text,Button} from 'react-native';
import {
    createBottomTabNavigator,
    createStackNavigator,
  } from 'react-navigation';
  
  class DetailsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text></Text>
        </View>
      );
    }
  }
  
  class HomeScreen extends React.Component {
    render() {
      var tentaikhoan = this.props.navigation.getParam('TenTaiKhoan','00');

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* other code from before here */}
          <Text>aaa</Text>
          <Text>{tentaikhoan}</Text>
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
      );
    }
  }
  
  class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* other code from before here */}
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
      );
    }
  }
  
  const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
  });
  
  const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Details: DetailsScreen,
  });
  
  export default createBottomTabNavigator(
    {
      Home: HomeStack,
      Settings: SettingsStack,
    },
    {
    }
  );