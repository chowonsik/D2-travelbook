import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import MainDashHeader from '../components/MainDashHeader';
import MainDashFooter from '../components/MainDashFooter';

class MainOne extends Component {

  constructor(props) {
    super(props);
    this.state ={
      text: 'Google Map Setting'
    };
  }

  render() {
    return (
      <View style={styles.wrap}>
        <MainDashHeader />
        <View style={styles.content}>
          <Text style={styles.welcome}>{this.state.text}</Text>
        </View>
        <MainDashFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000'
  }
});

export default MainOne