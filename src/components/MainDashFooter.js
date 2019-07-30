import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import MainSafeMargin from './MainSafeMargin';
import { Actions, Tabs, Scene } from 'react-native-router-flux';
import MainOne from '../pages/MainOne';

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
  OtherTLOpener() {
    Actions.mainone()
  }

  render() {
    return (
      <Tabs
        showLabel={false}
        lazy={true}
        tabStyle={styles.tab}
        tabBarStyle={styles.tabs}
        labelStyle={styles.label}
        swipeEnabled={false}
      >
        <Scene
          hideNavBar
          key="mainone"
          component={MainOne}
          icon={({ focused }) => (
            <Icon
              size={iconSize}
              color={focused ? activeIconColor : iconColor}
              name={`drop2`}
              text={`My Water`}
              textStyle={focused ? [styles.label, styles.activeLabel] : styles.label}
            />
          )}
        />
        <Scene
          hideNavBar
          key="mainone"
          component={MainOne}
          icon={({ focused }) => (
            <Icon
              size={iconSize}
              color={focused ? activeIconColor : iconColor}
              textStyle={focused ? [styles.label, styles.activeLabel] : styles.label}
              name={`envelope`}
              text={`Messages`}
            />
          )}
        />
      
        <Scene
          hideNavBar
          key="mainone"
          component={MainOne}
          icon={({ focused }) => (
            <Icon
              size={iconSize}
              color={focused ? activeIconColor : iconColor}
              textStyle={focused ? [styles.label, styles.activeLabel] : styles.label}
              name={`home3`}
              text={`My Account`}
            />
          )}
        />
      </Tabs>
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