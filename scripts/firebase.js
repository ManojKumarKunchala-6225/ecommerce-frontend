import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAd9N5oBy_EscvleQ0QT26gvYgnKW2bJYE",
  authDomain: "ecommerce-frontend-63b04.firebaseapp.com",
  projectId: "ecommerce-frontend-63b04",
  storageBucket: "ecommerce-frontend-63b04.appspot.com",
  messagingSenderId: "226247791131",
  appId: "1:226247791131:web:735494d9cdac9fde389ebe"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);