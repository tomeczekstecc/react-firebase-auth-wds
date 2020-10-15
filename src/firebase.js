import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCip9iH16CHKXyINsPOG5XBk58C0wQkbLE',
  authDomain: 'react-firebase-auth-wds-dev.firebaseapp.com',
  databaseURL: 'https://react-firebase-auth-wds-dev.firebaseio.com',
  projectId: 'react-firebase-auth-wds-dev',
  storageBucket: 'react-firebase-auth-wds-dev.appspot.com',
  messagingSenderId: '1062927417553',
  appId: '1:1062927417553:web:31a87591a9c96bb82185f0',
});


export  const auth = app.auth()
export default app