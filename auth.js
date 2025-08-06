import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById('loginUser').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    await signInWithEmailAndPassword(
      window.auth, // Use the globally available auth
      document.getElementById('login-email').value,
      document.getElementById('login-password').value
    );
    alert("Login successful!");
    window.location.href = "lessons.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});
