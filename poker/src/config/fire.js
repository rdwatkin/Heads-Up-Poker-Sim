import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDKHg3Do27Yf1UUCtBpJma17tFPmaV9RJU",
    authDomain: "ygigiu-516ca.firebaseapp.com",
    databaseURL: "https://ygigiu-516ca.firebaseio.com",
    projectId: "ygigiu-516ca",
    storageBucket: "ygigiu-516ca.appspot.com",
    messagingSenderId: "610036309890",
    appId: "1:610036309890:web:ef99aa059ecee0ad18399b",
    measurementId: "G-JTNXZV7H35"
};

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;