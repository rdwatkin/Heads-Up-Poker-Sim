import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCs2Lqiv-uhSHtoUoNVXhVfsS17n_sVUp4",
    authDomain: "heads-up-poker-e6660.firebaseapp.com",
    databaseURL: "https://heads-up-poker-e6660.firebaseio.com",
    projectId: "heads-up-poker-e6660",
    storageBucket: "heads-up-poker-e6660.appspot.com",
    messagingSenderId: "1048257876368",
    appId: "1:1048257876368:web:04aa16846a8f129c216315",
    measurementId: "G-9WLQLCE8Y0"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;