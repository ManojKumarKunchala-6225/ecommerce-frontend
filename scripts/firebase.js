// scripts/firebase.js
import firebase from "https://www.gstatic.com/firebasejs/9.6.1/firebase-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd9N5oBy_EscvleQ0QT26gvYgnKW2bJYE",
  authDomain: "ecommerce-frontend-63b04.firebaseapp.com",
  projectId: "ecommerce-frontend-63b04",
  storageBucket: "ecommerce-frontend-63b04.appspot.com",
  messagingSenderId: "226247791131",
  appId: "1:226247791131:web:735494d9cdac9fde389ebe"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
