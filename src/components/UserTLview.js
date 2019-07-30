import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';
import { db, firebaseAuth, storage } from '../../reducer/Firebase';
export default class UserTLview extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      page: 0,
      //uid: firebaseAuth.currentUser.uid 
      //state 에서 uid 초기화 설정해도 받아 오지 못함
    }
  }

  getData = async () => {
    const response = await fetch('http://52.78.131.123/trip/' + this.state.page);

    //const response = await fetch('http://52.78.131.123/trip/' + this.state.uid);
    //state에서 적용해서 사용하는 경우

    const data = await response.json();

    this.setState({
      data: this.state.data.concat(data),
      page: this.state.page + 1
    })
  }

  componentDidMount() {
    this.getData();
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
  crudOpener(no) {
    Actions.crud(({ item: no }))
  }

  /*
  render() {
    var uid = firebaseAuth.currentUser.uid;
    

    return (
      <View style={{ backgroundColor: '#ffffff', padding: 2 }}>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => 
            <View style={{ padding: 10, margin: 10, backgroundColor: '#ffffff', borderRadius: 10, borderWidth: 2, borderColor: 'black' }}>
              <TouchableOpacity onPress={() => this.crudOpener(item.Trip_No)}>
                <Text style={{ fontWeight: "bold", paddingBottom: 10, paddingTop: 5 }}>
                  {item.Trip_No}
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
*/

render() {
  var uid = firebaseAuth.currentUser.uid; //해당 부분에서는 바로 가능, 따라서 개인 유저가 자신것만 보기 위해서는 해당 방법으로 가져와봄
  

  return (
    <View style={{ backgroundColor: '#ffffff', padding: 2 }}>
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
        <View style={{ padding: 10, margin: 10, backgroundColor: '#ffffff', borderRadius: 10, borderWidth: 4, borderColor: 'black' }}>
            { uid === item.User_No ? (
            <TouchableOpacity onPress={() => this.crudOpener(item.Trip_No)}>
              <Text style={{ fontWeight: "bold", paddingBottom: 5, paddingTop: 5,fontSize:24 }}>
                {item.Trip_Title}
              </Text>

              <Text style={{ fontWeight: "bold", paddingBottom: 10, paddingTop: 5,fontSize:18 }}>
                {item.Trip_Content}
              </Text>

              <Image source={{ uri: item.Trip_Img }}
                style={{ width: 300, height: 300 }} />
            </TouchableOpacity>
            ) : (
              <Text style={{ fontWeight: "bold", paddingBottom: 5, paddingTop: 5,fontSize:24 }}>
                First write u r Trips
              </Text>
            )
            }
          </View>
        }
        ListFooterComponent={this.myFooter}



      />
    </View>
  )
}
}