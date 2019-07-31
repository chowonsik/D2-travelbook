import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from "react-native-fetch-blob";
import Icon from 'react-native-vector-icons/FontAwesome'
import { db, firebaseAuth, storage } from '../../reducer/Firebase';
// import { TextInput } from 'react-native-paper';
import MaterialHeader4 from "../components/MaterialHeader4";

import { Actions } from 'react-native-router-flux';

export default class Writetrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Title: '',
            Content: '',
            imagepath: null,
            imagemime: '',
            imageUri: '',
        };
    }

    //여행일지표지 선택 함수
    imagepicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400
        }).then(image => {
            this.setState({
                imagepath: image.path,
                imagemime: image.mime
            });
            this.handleUploadImage(this.state.imagepath, this.state.imagemime);
        });
    }


    //여행일지표지 업로드 함수
    handleUploadImage(uri, mime) {

        const image = uri;
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const Fetch = RNFetchBlob.polyfill.Fetch
        // replace built-in fetch
        window.fetch = new Fetch({
            // enable this option so that the response data conversion handled automatically
            auto: true,
            // when receiving response data, the module will match its Content-Type header
            // with strings in this array. If it contains any one of string in this array, 
            // the response body will be considered as binary data and the data will be stored
            // in file system instead of in memory.
            // By default, it only store response data to file system when Content-Type 
            // contains string `application/octet`.
            binaryContentTypes: [
                'image/',
                'video/',
                'audio/',
                'foo/',
            ]
        }).build()

        const d = new Date();
        var date = d.getDate(); //Current Date
        var month = d.getMonth() + 1; //Current Month
        var year = d.getFullYear(); //Current Year
        var hours = d.getHours(); //Current Hours
        var min = d.getMinutes(); //Current Minutes
        var sec = d.getSeconds(); //Current Seconds
        var filename = year + '.' + month + '.' + date + '.' + hours + ':' + min + ':' + sec;

        let uploadBlob = null;

        const imageRef = storage.ref(`tripimage/${filename}`).child(this.state.Title);
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
                imageRef.getDownloadURL().then((url) => {
                    this.state.imageUri = url;
                }, function (error) {
                    console.log(error);
                });
            })
            .catch((error) => {
                alert(error);

            })

    }


    //여행일지 저장 함수
    saveDate() {
        var uid = firebaseAuth.currentUser.uid;
        var qwe = {
            User_ID: uid,
            Trip_Title: this.state.Title,
            Trip_Content: this.state.Content,
            Trip_Img: this.state.imageUri
        };

        fetch('http://52.78.131.123/newtrip', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },//Request Type
            body: JSON.stringify({
                User_ID: uid,
                Trip_Title: this.state.Title,
                Trip_Content: this.state.Content,
                Trip_Img: this.state.imageUri
            }),//post body
        });
        db.ref(`trip/${uid}`).push(qwe);
        db.ref
        Actions.Writetrip;
    }

    render() {
        return (

            <View>
                <TextInput
                    label='Title'
                    value={this.state.Title}
                    onChangeText={Title => this.setState({ Title })}
                />
                <TextInput
                    label='Content'
                    multiline={true}
                    value={this.state.Content}
                    onChangeText={Content => this.setState({ Content })}
                />
                <TextInput
                    style={{ height: 100 }}
                    onChangeText={(val) => {
                        this.setState({
                            Title: val
                        })
                    }}
                    value={this.state.Title}
                    multiline={true}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <TextInput
                    style={{ height: 100 }}
                    onChangeText={(val) => {
                        this.setState({
                            Content: val
                        })
                    }}
                    value={this.state.Content}
                    multiline={true}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <TouchableOpacity onPress={() => this.imagepicker()}>

                    <View style={styles.ImageContainer}>

                        {this.state.imagepath === null ? <Icon name="camera" size={240}></Icon> :
                            <Image style={styles.ImageContainer} source={{ uri: this.state.imagepath }} />
                        }

                    </View>

                </TouchableOpacity>
                <Button
                    onPress={() => this.saveDate()}
                    title="Save"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingTop: 20
    },

    ImageContainer: {
        borderRadius: 10,
        width: '100%',
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    TextInputStyle: {

        textAlign: 'center',
        height: 40,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#028b53',
        marginTop: 20
    },
    button: {

        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },

});