import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image

} from 'react-native';


import { Actions } from 'react-native-router-flux';

export default class detail extends Component {



  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text >Enjoy our app</Text>
          </View>
          <View style={styles.content}>
            <Image
              source={this.props.marker.image}
              style={styles.DetailImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.footer}>
            <Text >{this.props.marker.description}</Text>
          </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  content: {
    flex: 6,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  footer: {
    flex: 2,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  DetailImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  }
});