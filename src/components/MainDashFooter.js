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

  //타임라인화면 보내는 함수
  timelineOpener() {
    Actions.timeline()
  }

  //Others 보내는 함수
  othersOpener(){
    Actions.others()
  }

  render() {
    return (
      <View>
        <View style={styles.footer}>
          <MainSafeMargin />
          <TouchableOpacity onPress={() => this.timelineOpener()} style={styles.footerIcon}>
            <Image source={require('../imgs/my-icon.png')} style={{
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
          <TouchableOpacity onPress={() => this.othersOpener()} style={styles.footerIcon}>
            <Image source={require('../imgs/home-icon.png')} style={{
              width: 22,
              height: 22,
            }} />
          </TouchableOpacity>
          <MainSafeMargin />
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
    backgroundColor: '#f5f5f5',
  },
  footerIcon: {
    flex: 1,
    alignItems: 'center',
  },
  footerIndicator: {
    height: 22,
    backgroundColor: '#f5f5f5',
  }
});

export default MainDashFooter