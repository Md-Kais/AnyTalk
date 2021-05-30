

import firebase from 'firebase';
import 'firebase/firestore';


import 'firebase/firebase-app';
import 'firebase/firebase-storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaKpecHCFR3WeN9Xmh6CyzvWeZaobhSsU",
    authDomain: "anymessage-462f8.firebaseapp.com",
    projectId: "anymessage-462f8",
    storageBucket: "anymessage-462f8.appspot.com",
    messagingSenderId: "346973139418",
    appId: "1:346973139418:web:a76503b25a9592c17110e3",
    measurementId: "G-W89M849WW7"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth , provider };
export default db;