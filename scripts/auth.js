const e = firebase.auth(),
  t = document.getElementById("auth-form"),
  n = document.getElementById("email"),
  o = document.getElementById("password"),
  s = document.getElementById("toggle-link"),
  m = document.getElementById("form-title"),
  d = document.getElementById("submit-btn"),
  i = document.getElementById("error-message"),
  l = document.getElementById("success-message");
let c = !0;
s.addEventListener("click", (e) => {
  e.preventDefault(),
    (c = !c),
    (m.textContent = c ? "Login" : "Sign Up"),
    (d.textContent = c ? "Login" : "Sign Up"),
    (s.textContent = c ? "Sign up here" : "Login here");
}),
  t.addEventListener("submit", (t) => {
    t.preventDefault();
    const s = n.value,
      m = o.value;
    (i.textContent = ""),
      (l.textContent = ""),
      c
        ? e
            .signInWithEmailAndPassword(s, m)
            .then((e) => {
              (l.textContent = "Login successful!"),
                (window.location.href = "home.html");
            })
            .catch((e) => {
              i.textContent = e.message;
            })
        : e
            .createUserWithEmailAndPassword(s, m)
            .then((e) => {
              (l.textContent = "Signup successful!"),
                (window.location.href = "home.html");
            })
            .catch((e) => {
              i.textContent = e.message;
            });
  });
