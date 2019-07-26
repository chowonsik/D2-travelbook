import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
 
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import WriteDiary from './pages/WriteDiary';
import TimeLine from './pages/TimeLine';
import MainOne from './pages/MainOne';
import Others from './pages/Others';
 
export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: '#1565c0',}} 
                titleStyle={{color: 'white',}}
            >
                
                <Stack key="root">
                <Scene initial key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                <Scene key="main" component={Main} title="Main" hideNavBar/>
                <Scene key="mainone" component={MainOne} title="MainOne"/>
                <Scene key="timeline" component={TimeLine} title="TimeLine"/>
                <Scene key="others" component={Others} title="Others"/>
                <Scene key="writediary" component={WriteDiary} title="WriteDiary"/>
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