import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {db, firebaseAuth, storage} from '../../reducer/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker';
import  RNFetchBlob  from "react-native-fetch-blob";

export default class WriteDiary extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            noteText: '',
            imagesURI: [],
            location: {
                lon: [],
                lat: []
            },
            date: ''
        };
    }
    imagepicker(){
        ImagePicker.openPicker({
            multiple: true,
            includeExif: true
            // includeBase64: true
          }).then(images => {
            // alert(JSON.stringify(images));
            for(var i = 0; i < images.length ;i++){
            this.state.location.lon[i] = images[i].exif.GPSLongitude;
            this.state.location.lat[i] = images[i].exif.GPSLatitude;
            // var uri = `data:${images[i].mime};base64,${images[i].data}`;
            this.handleUploadImage(images[i].path, images[i].mime, new Date());
            }
            alert(this.state.location.lon);
          });
        }
        

        handleUploadImage(uri, mime, imagename){
        
        const image=uri;
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
    
       
        let uploadBlob = null;
    
        const imageRef = storage.ref('posts').child(imagename);
        fs.readFile(image, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            alert(imageRef.getDownloadURL());
            return images =+ imageRef.getDownloadURL()
          })
          .then((url) => {
            // URL of the image uploaded on Firebase storage
            // console.warn(url);   
            // this.setState({_takedPhotoUri:uri})     
          })
          .catch((error) => {
            alert(error);
    
          })  
        // const response = fetch(uri);
        // const blob = response.blob();
    
        // var ref = firebase.storage().ref().child('images/' + imagename)
        // return ref.put(blob);
       
      }

    

    saveDate(){
            //date and time
            const d = new Date();
            var date = d.getDate(); //Current Date
            var month = d.getMonth() + 1; //Current Month
            var year = d.getFullYear(); //Current Year
            var hours = d.getHours(); //Current Hours
            var min = d.getMinutes(); //Current Minutes
            var sec = d.getSeconds(); //Current Seconds
            this.state.date = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

        //     for(var i = 0; i < this.state.imagesUri;i++){
        // const sessionId = new Date().getTime();
        // const imageRef = storage.ref('images').child(`${sessionId}`);
        // return imageRef.putFile(uri);
            // }
            // this.setState({
            //     //Setting the value of the date time
            //     date:
            //       date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
            //   });
            
            //check if there is no text
            // const noteText = 'Nothing much today ~';
            // if(this.state.noteText.length != 0){
            //     noteText = this.state.noteText;
            // }
            var uid = firebaseAuth.currentUser.uid;
            db.ref(`diary/${uid}`).push(this.state);
            Actions.pop();
        }

    render() {
        return(
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.saveDate()} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
                <View style={styles.materialCardBasic}>
                <TouchableOpacity onPress={() => this.imagepicker()}>
                    <Icon name="camera" size={240}></Icon>
                </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={(val) => {
                            this.setState({noteText: val})                        
                        }}
                        value={this.state.noteText}
                        multiline = {true}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>    
                    </TextInput>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'black',
        fontSize: 18,
        paddingTop: 25,
        paddingBottom: 10
    },
    scrollContainer: {
        flex: 1,
        //marginBottom: 100
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
        borderTopWidth:2,
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
    materialCardBasic: {
        flex: 1
      }
});