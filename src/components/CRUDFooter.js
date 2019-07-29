import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import MainSafeMargin from './MainSafeMargin';
import { Actions } from 'react-native-router-flux';

class CRUDFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  //CRUD에 필요한 함수 설정
  /*
  //타임라인화면 보내는 함수
  timelineOpener() {
    Actions.timeline()
  }

  //Others 보내는 함수
  othersOpener(){
    Actions.others()
  }
  */

  render() {
    return (
      <View>
        <View style={styles.footer}>
          <MainSafeMargin />
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/edit-icon.png')} style={{
              width: 28,
              height: 28,
            }} />
          </View>
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/bin-icon.png')} style={{
              width: 26,
              height: 26,
            }} />
          </View>
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

export default CRUDFooter