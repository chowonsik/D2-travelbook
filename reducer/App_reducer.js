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
      db.ref(`users/${uid}`).set(user);
    //   login(uid);
    })
  }