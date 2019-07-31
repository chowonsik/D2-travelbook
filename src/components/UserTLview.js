import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';
import { db, firebaseAuth, storage } from '../../reducer/Firebase';

export default class UserTLview extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    fetch('http://52.78.131.123/mytrip/'+firebaseAuth.currentUser.uid)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            data: responseJson,
        }, function () {
        });
      })
      
  }
  //CRUD 화면 오프너
  crudOpener(no, title) {
    Actions.crud(({ item: no, title: title }))
  }

  render() {
   
    return (
      <View style={styles.container} >
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>

            <View style={styles.contentline}>
              <TouchableOpacity onPress={() => this.crudOpener(item.Trip_No, item.Trip_Title)}>
              <Image source={{ uri: item.Trip_Img }}
                  style={styles.img} />
              <Text style={styles.title}>
                  {item.Trip_Title}
                </Text>
                
                <Text style={styles.content}>
                  {item.Trip_Content}
                </Text>
                <Text style={styles.content}>
                  {item.Trip_Date}
                </Text>

              

              </TouchableOpacity>

            </View>
          }
          //ListFooterComponent={this.myFooter}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width:'100%',
    backgroundColor: '#ffffff', 
    padding: 10
  },
  contentline: {
    width:'100%',
    padding: 10, 
    marginBottom:10,
    backgroundColor: '#ffffff', 
    borderRadius: 5,
     borderWidth: 4, 
     borderColor: 'black'
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 5,
    fontSize:20
  },
  content: {
    paddingBottom: 10, 
    paddingTop: 5,
    fontSize:15
  },
  img: {
    width: '100%', 
    height: 300,
    
  }

});