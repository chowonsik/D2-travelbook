// import { createAction, handleActions } from 'redux-actions';
import {db, firebaseAuth, storage} from '../reducer/Firebase';

// export const login = createAction(LOGIN);

export const firebase_login = (email, pw) =>{
    return firebaseAuth.signInWithEmailAndPassword(email, pw);
}

export function firebase_logout () {
    return (dispatch) => {
      firebaseAuth.signOut();
      dispatch(logout());
    }  
}

export const firebase_register = (email, pw) =>{
    return firebaseAuth.createUserWithEmailAndPassword(email, pw).then(function() {
      var uid = firebaseAuth.currentUser.uid;
  
      var user = {
        uid: uid,
        userid: email,
        usernm: email,
        usermsg: ''
      };
      fetch('http://52.78.131.123/user', {
      method: "POST",//Request Type
      body: JSON.stringify(user),//post body
    })
    .then()
    //If response is in json then in success
   
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
      db.ref(`users/${uid}`).set(user);
    //   login(uid);
    })
  }