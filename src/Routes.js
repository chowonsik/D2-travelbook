import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import WriteDiary from './pages/WriteDiary';
import Writetrip from './pages/Writetrip';
import UserTL from './pages/UserTL';
import MainOne from './pages/MainOne';

import CRUD from './pages/CRUD';
import Detail from './pages/detail'
console.disableYellowBox = true;
export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle={styles.barButtonIconStyle}
                hideNavBar={false}
                navigationBarStyle={{ backgroundColor: '#1565c0', }}
                titleStyle={{ color: 'white', }}
            >
                <Stack key="root">
                    <Scene initial key="login" component={Login} title="Login" />
                    <Scene key="signup" component={Signup} title="Sign up" />
                    <Scene key="mainone" component={MainOne} title="MainOne" hideNavBar />
                    <Scene key="userTL" component={UserTL} title="UserTL" hideNavBar />
                    <Scene key="crud" component={CRUD} title="CRUD" hideNavBar/>
                    <Scene key="writediary" component={WriteDiary} title="WriteDiary" />
                    <Scene key="writetrip" component={Writetrip} title="Writetrip"/>
                    <Scene key="detail" component={Detail} title="detail" />
                </Stack>

            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}