import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAw9YAx7EpsbS4k6yekKraB4K7cDAi9594",
  authDomain: "react-test-140de.firebaseapp.com",
  databaseURL: "https://react-test-140de.firebaseio.com",
  projectId: "react-test-140de",
  storageBucket: "react-test-140de.appspot.com",
  messagingSenderId: "30598900398",
  appId: "1:30598900398:web:e764475f292902a0195b3f",
  measurementId: "G-79MDBLWZYY"
};

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;