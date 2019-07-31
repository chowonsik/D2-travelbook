import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';
import { db, firebaseAuth, storage } from '../../reducer/Firebase';

export default class OtherTLview extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      page: 0
    }
  }

  getData = async () => {
    const response = await fetch('http://52.78.131.123/trip/' + this.state.page);

    const data = await response.json();

    this.setState({
      data: this.state.data.concat(data),
      page: this.state.page + 1
    })
  }

  componentDidMount() {
    this.getData()
  }

  myFooter = () => {
    return (
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#ffffff', alinItems: 'center', borderRadius: 10, padding: 10, borderWidth: 2, borderColor: "black", width: '100%' }}
          onPress={this.getData}>
          <Text style={{ fontWeight: "bold", fontSize: 20, alinItems: 'center' }}>More Lines</Text>
        </TouchableOpacity>
      </View>
    )
  }

  //CRUD 화면 오프너
  crudOpener(no, title) {
    Actions.crud(({ item: no, title: title }))
  }

  render() {
    var uid = firebaseAuth.currentUser.uid;

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
          ListFooterComponent={this.myFooter}
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