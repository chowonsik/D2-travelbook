import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Image } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {db, firebaseAuth, storage} from '../../reducer/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import  RNFetchBlob  from "react-native-fetch-blob";
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Content } from 'native-base';

var dms2dec = require('dms2dec');

export default class WriteDiary extends Component {


    constructor(props) {
        super(props);
        this.state = {
            imagesURI: [],
            lon: [],
            lat: [],
            imagesdate: [],
            image: [],
            Text: [],
            lonRef: [],
            latRef: []
        };
    }

    //이미지 가져오는 함수
    imagepicker() {
        ImagePicker.openPicker({
            multiple: true,
            includeExif: true
        }).then(images => {
            this.onSend(images);
            for (var i = 0; i < images.length; i++) {
                this.state.lon[i] = images[i].exif.GPSLongitude;
                this.state.lat[i] = images[i].exif.GPSLatitude;
                this.state.imagesdate[i] = images[i].exif.DateTime;
                this.state.image[i] = images[i].path;
                this.state.lonRef[i] = images[i].exif.GPSLongitudeRef;
                this.state.latRef[i] = images[i].exif.GPSLatitudeRef;
            }
            this.setState({
                lon: this.state.lon,
                lat: this.state.lat,
                image: this.state.image
            })
        });
    }



    //이미지 업로드하는 함수
    onSend(images) {
        let photo = images.map(img => img.path);
        photo.forEach((image, i) => {
            const sessionId = new Date().getTime();
            const Blob = RNFetchBlob.polyfill.Blob;
            const fs = RNFetchBlob.fs;
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
            window.Blob = Blob;
            let uploadBlob = null;
            let mime = 'image/jpg';
            const imageRef = storage.ref('image').child(`${sessionId}${i}`);
            fs.readFile(image, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    this.state.imagesURI[i] = url;
                    console.log(url)
                })
                .catch((error) => {

                });

        })
    }




    //여행정보 저장하는 함수
    saveDate() {

        var uid = firebaseAuth.currentUser.uid;
        for (var i = 0; i < this.state.imagesURI.length; i++) {
            alert(this.state.imagesURI[i]);
            var sentence = this.state.lat[i].split(",");
            var sentence2 = this.state.lon[i].split(",");

            var dec = dms2dec([sentence[0], sentence[1], sentence[2]], this.state.latRef[i], [sentence2[0], sentence2[1], sentence2[2]], this.state.lonRef[i]);
            // dec[0] == 60.36123611111111, dec[1] == 5.370986111111111
            alert(JSON.stringify(dec));
            alert(this.state.lon[i]);
            var tripinfo = {
                Trip_No: 40,
                Info_Image: this.state.imagesURI[i],
                Info_Longitude: dec[1],
                Info_Latitude: dec[0],
                Info_Date: this.state.imagesdate[i],
                Info_Content: this.state.Text[i]
            }
            fetch('http://52.78.131.123/info', {
                method: "POST",//Request Type
                body: JSON.stringify(tripinfo),//post body
            }).then()
                //If response is in json then in success

                //If response is not in json then in error
                .catch((error) => {
                    alert(JSON.stringify(error));
                    console.error(error);
                });
            //lert(JSON.stringify(tripinfo));
            db.ref(`diary/${uid}`).push(tripinfo);
        }
        // db.ref(`diary/${uid}`).push(this.state);
        Actions.pop();
    }



    //여행정보 이미지 미리보기 및 이미지에 대한 텍스트 작성포멧
    renderImages() {
        let images = [];
        //let remainder = 4 - (this.state.devices % 4);
        this.state.image.map((item, index) => {
            images.push(
                <Card>
                    <Image
                        key={index}
                        source={{ uri: item }}
                        style={{ height: 300 }}
                    />
                    <TextInput
                        key={index}
                        style={{ height: 100 }}
                        onChangeText={(val) => {
                            this.state.Text[index] = val
                        }}
                        value={this.state.Text[index]}
                        multiline={true}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                </Card>
            );
        });

        return images;
    }

    render() {
        return (
            <ScrollView>

                <TouchableOpacity onPress={() => this.saveDate()} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.imagepicker()}>
                    <Icon name="camera" size={240}></Icon>
                </TouchableOpacity>
                {this.renderImages()}
            </ScrollView>


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
        justifyContent: 'center',
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
        flex: 1
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
    materialCardBasic: {
        flex: 1
    },
    root: {
        flex: 1,
        backgroundColor: "#FFF",
        flexWrap: "nowrap",
        elevation: 3,
        borderRadius: 2,
        borderColor: "#CCC",
        borderWidth: 1,
        shadowOffset: {
            height: 2,
            width: -2
        },
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        overflow: "hidden"
    },
    body: {
        padding: 16
    },
    bodyText: {
        color: "#424242",
        fontSize: 14,
        lineHeight: 20
    }

});