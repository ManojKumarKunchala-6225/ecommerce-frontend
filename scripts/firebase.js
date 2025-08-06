// In scripts/firebase.js

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration (from your file)
const firebaseConfig = {
  apiKey: "AIzaSyAd9N5oBy_EscvleQ0QT26gvYgnKW2bJYE",
  authDomain: "ecommerce-frontend-63b04.firebaseapp.com",
  projectId: "ecommerce-frontend-63b04",
  storageBucket: "ecommerce-frontend-63b04.appspot.com",
  messagingSenderId: "226247791131",
  appId: "1:226247791131:web:735494d9cdac9fde389ebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth service so other files can use it
export const auth = getAuth(app);