import React, { Component } from 'react';
import { Text, View } from 'react-native';

import NguoiDung_XemQuanAn from '../NguoiDung_XemQuanAn';

export default class User_AllRest extends Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <NguoiDung_XemQuanAn/>
      </View>
    );
  }
}
