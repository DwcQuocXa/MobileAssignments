// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXNud0bRl1JaiYFi442UMKpgSSFj9rcd8",
    authDomain: "shoppinglistfirebase-8aa22.firebaseapp.com",
    databaseURL: "https://shoppinglistfirebase-8aa22-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglistfirebase-8aa22",
    storageBucket: "shoppinglistfirebase-8aa22.appspot.com",
    messagingSenderId: "725006449649",
    appId: "1:725006449649:web:322601ec835dc880e6a250",
    measurementId: "G-S4ZHKCVZCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
