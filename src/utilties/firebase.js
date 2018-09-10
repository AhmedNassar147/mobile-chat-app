import * as firebase from 'firebase';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAng_Sj-WdS65Fji3YkpRT29XhmUdLzw0A",
  authDomain: "native-chat-app-ab7ae.firebaseapp.com",
  databaseURL: "https://native-chat-app-ab7ae.firebaseio.com",
  projectId: "native-chat-app-ab7ae",
  storageBucket: "native-chat-app-ab7ae.appspot.com",
  messagingSenderId: "84760172521"
};
export default firebase.initializeApp(config);
