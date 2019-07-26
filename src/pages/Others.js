import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, FlatList, ActivityIndicator} from 'react-native';
import MainDashHeader from '../components/MainDashHeader';
import OtherFlatView from '../components/OtherFlatView';
//import MainDashFooter from '../components/MainDashFooter';

class Others extends Component {

  constructor(props) {
    super(props);
    this.state ={
      text: 'TimeLine ListView Setting'
    };
  }

  render() {
    return (
      <View style={styles.wrap}>
        <MainDashHeader />
        <View style={styles.content}>
          <OtherFlatView />
        </View>
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

export default Others