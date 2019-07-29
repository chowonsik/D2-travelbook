import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import MainDashHeader from '../components/MainDashHeader';
import CRUDFooter from '../components/CRUDFooter';

class CRUD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'CRUD Screen',
        };
    }

    render() {
        return (
            <View style={styles.wrap}>
                <MainDashHeader />
                <View style={styles.content}>
                    <Text style={styles.welcome}>{this.state.text}</Text>
                </View>
                <CRUDFooter />
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

export default CRUD