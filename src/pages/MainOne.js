import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import MainDashHeader from '../components/MainDashHeader';
import OtherTLview from '../components/OtherTLview';
import MainDashFooter from '../components/MainDashFooter';
import { db, firebaseAuth, storage } from '../../reducer/Firebase';
class MainOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: 'TimeLine ListView Setting',
      currentUser: null

    };
  }
  componentDidMount() {
    var uid = firebaseAuth.currentUser.uid;
    alert(uid);
    //this.setState({ currentUser: firebaseAuth.currentUser.uid});
    //alert(JSON.stringify(firebaseAuth.currentUser.uid));
    //alert(firebaseAuth.currentUser.uid);
  }



  render() {

    return (
      <View style={styles.wrap}>
        <MainDashHeader />
        <View style={styles.content}>
          <OtherTLview />
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