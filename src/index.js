import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';
import 'firebase/firestore';   // for cloud firestore
import 'firebase/auth';        // for authentication

import 'bootstrap/dist/css/bootstrap.min.css';

var firebaseConfig = {
  apiKey: "AIzaSyBLHvGzdukqgERw9K3PBV2TATM_Zm0TY7s",
  authDomain: "bccovid.firebaseapp.com",
  databaseURL: "https://bccovid.firebaseio.com",
  projectId: "bccovid",
  storageBucket: "bccovid.appspot.com",
  messagingSenderId: "634774436839",
  appId: "1:634774436839:web:b9df834a6a5efc4bdc5b42"
};
firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
