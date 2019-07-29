import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';

export default class UserTLview extends Component {

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
          style={{ backgroundColor: '#ffffff', alinItems: 'center', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: "black", width: '100%' }}
          onPress={this.getData}>
          <Text style={{ fontWeight: "bold", fontSize: 20, alinItems: 'center' }}>더 보기</Text>
        </TouchableOpacity>
      </View>
    )
  }

  //CRUD 화면 오프너
  crudOpener() {
    Actions.crud()
  }

  render() {
    return (
      <View style={{ backgroundColor: '#ffffff', padding: 2 }}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={{ padding: 10, margin: 10, backgroundColor: '#ffffff', borderRadius: 10, borderWidth: 2, borderColor: 'black' }}>
              <TouchableOpacity onPress={() => this.crudOpener()}>
                <Text style={{ fontWeight: "bold", paddingBottom: 10, paddingTop: 5 }}>
                  {get_Trip_No = item.Trip_No}
                </Text>

                <Text style={{ fontWeight: "bold", paddingBottom: 10, paddingTop: 5 }}>
                  {item.Trip_Title}
                </Text>

                <Image source={{ uri: item.Trip_Img }}
                  style={{ width: 300, height: 300 }} />
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={this.myFooter}


        />
      </View>
    )
  }
}
