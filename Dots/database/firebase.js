// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaYkoKLjUaE28Xr3jerkdEW_EiKYAUZzo",
  authDomain: "dots-faea6.firebaseapp.com",
  projectId: "dots-faea6",
  storageBucket: "dots-faea6.appspot.com",
  messagingSenderId: "157861244394",
  appId: "1:157861244394:web:488c915c3de855698b9693",
  measurementId: "G-CQWKHJ0HWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;



// // database/firebaseDb.js
// import * as firebase from 'firebase';
// const firebaseConfig = {
//         apiKey: "AIzaSyAaYkoKLjUaE28Xr3jerkdEW_EiKYAUZzo",
//         authDomain: "dots-faea6.firebaseapp.com",
//         projectId: "dots-faea6",
//         storageBucket: "dots-faea6.appspot.com",
//         messagingSenderId: "157861244394",
//         appId: "1:157861244394:web:13e69574b746e8b18b9693",
//         measurementId: "G-H30Z294S29"
// };
// firebase.initializeApp(firebaseConfig);
// export default firebase;

