import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {db, firebaseAuth, storage} from '../../reducer/Firebase';
import {firebase_login, firebase_register} from '../../reducer/App_reducer';

export default class Form extends Component {
   constructor(props){        
     super(props);        
     this.state={            
        email:'',
        password: ''        
     }   
}

// saveLoginInfo = () => {
//     if (this.state.remember) {
//       localStorage.email = this.state.email;
//       localStorage.remember = this.state.remember;
//     } else {
//       localStorage.email = null;
//       localStorage.remember = null;
//     }
//   }

saveData =()=>{
    //Actions.jump("main");
    const {email,password} = this.state;

    if(this.props.type !== 'Login')
    {
        firebase_register(email, password)
        .catch((error) => {
            alert(error);
        })
    }
    else if(this.props.type == 'Login')
    {
        firebase_login(email, password).then(function() {
            Actions.mainone();
          }
        )
        .catch((error) => {
            alert(error);
        })
    }
}

showData = async()=>{
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    let ld = JSON.parse(loginDetails);
    alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
}

naverLogout = () => {
  NaverLogin.logout();
}

render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />
 
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
            
        )
}

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
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