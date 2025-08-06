const auth = firebase.auth();

const authForm = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

let isLogin = true; // start in login mode

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  submitBtn.textContent = isLogin ? "Login" : "Sign Up";
  toggleLink.textContent = isLogin
    ? "Sign up here"
    : "Login here";
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  errorMessage.textContent = "";
  successMessage.textContent = "";

  if (isLogin) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        successMessage.textContent = "Login successful!";
        window.location.href = "home.html";
      })
      .catch((error) => {
        errorMessage.textContent = error.message;
      });
  } else {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        successMessage.textContent = "Signup successful!";
        window.location.href = "home.html";
      })
      .catch((error) => {
        errorMessage.textContent = error.message;
      });
  }
});
