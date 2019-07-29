import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import MainSafeMargin from './MainSafeMargin';
import { Actions } from 'react-native-router-flux';

class MainDashFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  //유저타임라인화면 보내는 함수
  UserTLOpener() {
    Actions.userTL()
  }


  //다른사람타임라인화면 보내는 함수
  OtherTLOpener(){
    Actions.mainone()
  }

  render() {
    return (
      <View>
        <View style={styles.footer}>
          <MainSafeMargin />
          <TouchableOpacity onPress={() => this.OtherTLOpener()} style={styles.footerIcon}>
            <Image source={require('../imgs/people-icon.png')} style={{
              width: 26,
              height: 24,
            }} />
          </TouchableOpacity>
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/plus-icon.png')} style={{
              width: 28,
              height: 28,
            }} />
          </View>
          <TouchableOpacity onPress={() => this.UserTLOpener()} style={styles.footerIcon}>
            <Image source={require('../imgs/my-icon.png')} style={{
              width: 26,
              height: 26,
            }} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerIndicator}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  footerIcon: {
    flex: 1,
    alignItems: 'center',
  },
  footerIndicator: {
    height: 22,
    backgroundColor: '#ffffff',
  }
});

export default MainDashFooter