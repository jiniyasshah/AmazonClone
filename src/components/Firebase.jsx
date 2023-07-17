import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD64wm_wLGry3J9R1DpcAMOXyONrBnSuAg",
  authDomain: "clone-d79ed.firebaseapp.com",
  projectId: "clone-d79ed",
  storageBucket: "clone-d79ed.appspot.com",
  messagingSenderId: "334298373674",
  appId: "1:334298373674:web:53a41f0409fb082f86ad53",
  measurementId: "G-7HV6F7DV95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
