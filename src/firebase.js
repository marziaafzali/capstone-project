
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdzE4Xu9qiyBE1F7TgeZiOJ3SG-XLDavk",
  authDomain: "web-app-ee8ff.firebaseapp.com",
  projectId: "web-app-ee8ff",
  storageBucket: "web-app-ee8ff.firebasestorage.app",
  messagingSenderId: "239644548443",
  appId: "1:239644548443:web:91ef664093b68c358d4e7e",
  measurementId: "G-2197XB01CJ"
};

//  Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
