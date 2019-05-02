// @flow
import firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyC56vmcgIAhmsufKY4n-scNuRiX6TSdmL0',
  authDomain: 'zote-fe96b.firebaseapp.com',
  databaseURL: 'https://zote-fe96b.firebaseio.com',
  projectId: 'zote-fe96b',
  storageBucket: 'zote-fe96b.appspot.com',
  messagingSenderId: '138227772286',
};

firebase.initializeApp(firebaseConfig);

export const firebaseDatabase = firebase.firestore();
