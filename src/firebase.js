// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyC3-SRLqINO5ts_pVYVE2-mB_qqhgEd63I",
    authDomain: "chords-3e299.firebaseapp.com",
    databaseURL: "https://chords-3e299.firebaseio.com",
    projectId: "chords-3e299",
    storageBucket: "chords-3e299.appspot.com",
    messagingSenderId: "566976033206",
    appId: "1:566976033206:web:18b2958046ceeabce8d117",
    measurementId: "G-MW7QPQFQXK"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {  auth , provider };
  export default db;

