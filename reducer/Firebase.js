import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB-GWhwMjh4Ywkde2CR27S-vNo30TOI1G4",
    authDomain: "testrn-58a4e.firebaseapp.com",
    databaseURL: "https://testrn-58a4e.firebaseio.com",
    projectId: "testrn-58a4e",
    storageBucket: "testrn-58a4e.appspot.com",
    messagingSenderId: "583551081518"
};

firebase.initializeApp(config);

export const db = firebase.database();
export const firebaseAuth = firebase.auth();
export const storage = firebase.storage();