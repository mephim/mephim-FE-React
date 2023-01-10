// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPdOsFV6wG-qF1uCNATweRhQ2v20j-6BA",
    authDomain: "mephim-cf569.firebaseapp.com",
    projectId: "mephim-cf569",
    storageBucket: "mephim-cf569.appspot.com",
    messagingSenderId: "280238809917",
    appId: "1:280238809917:web:8d950903652c0514bc1b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
