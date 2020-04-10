import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAjjURNOMZhmpYPbPYxC-IKYskcftFJgrs",
  authDomain: "gitfit-1a470.firebaseapp.com",
  databaseURL: "https://gitfit-1a470.firebaseio.com",
  projectId: "gitfit-1a470",
  storageBucket: "gitfit-1a470.appspot.com",
  messagingSenderId: "632217670963",
  appId: "1:632217670963:web:f197aa7a19ad5070c1da46",
  measurementId: "G-D5G3QYE59M"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.firestore();