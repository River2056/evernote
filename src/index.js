import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyAoO0BQFGTGaf-dtXX3hVEdXqdkOsPBhmA",
  authDomain: "evernote-clone-8fb86.firebaseapp.com",
  databaseURL: "https://evernote-clone-8fb86.firebaseio.com",
  projectId: "evernote-clone-8fb86",
  storageBucket: "evernote-clone-8fb86.appspot.com",
  messagingSenderId: "481847440114",
  appId: "1:481847440114:web:b1f8be434a2456f9eb566b",
  measurementId: "G-BV5DC2RCN4"
});

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();