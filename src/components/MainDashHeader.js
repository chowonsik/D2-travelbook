import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import MainSafeMargin from './MainSafeMargin';

class MainDashHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <MainSafeMargin />
                    <View style={styles.plusBtn}></View>
                    <View style={styles.logo}>
                        <Image source={require('../imgs/logo.png')} style={{
                            width: 120,
                            height: 20
                        }} />
                    </View>
                    <View style={styles.settingBtn}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}><Image source={require('../imgs/menu-icon.png')} style={{
                            width: 25,
                            height: 20
                        }} />
                        </View>
                    </View>
                    <MainSafeMargin />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: 44,
        backgroundColor: '#f5f5f5'
    },
    header: {
        textAlign: 'center',
        height: 56,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row'
    },
    plusBtn: {
        width: 60,
        backgroundColor: '#f5f5f5'
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingBtn: {
        width: 60,
        backgroundColor: '#f5f5f5'
    },
    title: {
        width: '100%',
        height: '9%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});

export default MainDashHeader