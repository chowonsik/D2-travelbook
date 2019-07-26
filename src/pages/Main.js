import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MaterialHeader4 from "../components/MaterialHeader4";
import MaterialCardBasic from "../components/MaterialCardBasic";
import EntypoIcon from 'react-native-vector-icons/Entypo'
export default class Main extends Component {
    writediary() {
        Actions.writediary();
    }
    render() {
        return (
            
            <View style={styles.root}>
                <MaterialHeader4 style={styles.materialHeader4} />
                <MaterialCardBasic style={styles.materialCardBasic} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        paddingTop: 25,
        paddingBottom: 10
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        color: 'black',
        padding: 15,
        borderTopWidth: 2,
        borderTopColor: '#ededed',
        height: 500
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 10,
        top: 27,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    returnButton: {
        position: 'absolute',
        zIndex: 11,
        left: 10,
        top: 27,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16
    },
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
      },
      materialHeader4: {
        top: 0,
        left: 0,
        width: '100%',
        height: 56,
        position: "absolute"
      },
      materialCardBasic: {
        top: 74.5,
        left: 0,
        width: '100%',
        height: 282,
        position: "absolute"
      }
});