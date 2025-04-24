import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCC0RQB8Q6S7yE9BSbe9LWtYF6zi696h1E",
  authDomain: "project1-a7270.firebaseapp.com",
  projectId: "project1-a7270",
  storageBucket: "project1-a7270.firebasestorage.app",
  messagingSenderId: "66023707669",
  appId: "1:66023707669:web:f81b61e939a674ad2a6a1c",
  measurementId: "G-1ELP7KSTRS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Fixed export name

export { app, analytics, auth, googleProvider };