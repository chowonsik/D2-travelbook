import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import {Actions} from 'react-native-router-flux';

import Form from '../components/Form';
import {db, firebaseAuth, storage} from 'c:/Users/user/react-native/login/reducer/Firebase';
import { NaverLogin, getProfile } from 'react-native-naver-login';

const initials = {
    kConsumerKey: 'O3tQ4vELZfnDSFJwhLV9',
    kConsumerSecret: 'PWS13Yfz42',
    kServiceAppName: 'travelapp',
  };

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        console.log('\n\n Initial Page :: src/components/pages/First/index.js \n\n');
    
        this.state = {
          isNaverLoggingin: false,
          theToken: 'token has not fetched'
        };
      }

    signup() {
        Actions.signup()
    }

    async fetchProfile() {
        const profileResult = await getProfile(this.state.theToken);
        console.log(profileResult);
        if (profileResult.resultcode === '024') {
          Alert.alert('로그인 실패', profileResult.message);
          return;
        }
        var user = {
            uid: profileResult.response.id,
            userid: profileResult.response.email,
            usernm: profileResult.response.name,
            usermsg: ''
          };
          db.ref(`users/${profileResult.response.id}`).set(user);
        // this.props.navigation.navigate('Second', {
        //   profileResult,
        // });
      }

    async naverLoginStart() {
        console.log('  naverLoginStart  ed');
        NaverLogin.login(initials, (err, token) => {
          console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
          this.setState({ theToken: token });
          this.fetchProfile();
          if (err) {
            console.log(err);
            return;
          }
        });
      }

      naverLogout() {
        NaverLogin.logout();
      }

    

    render() {
        return(
            
                <View style={styles.container}>
                <View style={styles.header}><Text>present by JCK</Text></View>
                <View style={styles.title}>
                    <Text style={{fontSize:25}}>새로운 여행의 시작,{'\n'}지금 이 앱을 실행해 보세요.</Text>
                    </View>
                    <View style={styles.content}></View>
                    {/* <Image
                    style={{height:'100%',width:'100%',resizeMode:'contain'}}
                    source={require('./img/main.png')}/> */}
                <Form type="Login"/>
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={() => this.naverLoginStart()}>Naver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={() => this.fetchProfile()}>Naverlogout</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    signupText: {
      color: '#12799f', 
      fontSize:16,
    },
    signupButton: {
        color: '#023e71',
        fontSize:16,
        fontWeight: '500',
    },
    header: {
        width:'100%',
        height:'9%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        width:'100%',
        height:'18%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});