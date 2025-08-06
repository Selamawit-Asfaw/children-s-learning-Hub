// Auth form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginUser');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const authMessage = document.querySelector('.auth-message');
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    authMessage.textContent = "Login successful! Redirecting...";
                    authMessage.classList.remove('error');
                    authMessage.classList.add('success');
                    
                    // Redirect to dashboard after short delay
                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1500);
                })
                .catch((error) => {
                    authMessage.textContent = error.message;
                    authMessage.classList.remove('success');
                    authMessage.classList.add('error');
                });
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupUser');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const childName = document.getElementById('child-name').value;
            const childAge = document.getElementById('child-age').value;
            const authMessage = document.querySelector('.auth-message');
            
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    
                    // Save additional user data to database
                    return firebase.database().ref('users/' + user.uid).set({
                        parentName: name,
                        email: email,
                        childName: childName,
                        childAge: childAge,
                        accountCreated: firebase.database.ServerValue.TIMESTAMP,
                        lastLogin: firebase.database.ServerValue.TIMESTAMP
                    });
                })
                .then(() => {
                    authMessage.textContent = "Account created successfully! Redirecting...";
                    authMessage.classList.remove('error');
                    authMessage.classList.add('success');
                    
                    // Redirect to dashboard after short delay
                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1500);
                })
                .catch((error) => {
                    authMessage.textContent = error.message;
                    authMessage.classList.remove('success');
                    authMessage.classList.add('error');
                });
        });
    }
    
    // Reset password form
    const resetForm = document.getElementById('resetPassword');
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('reset-email').value;
            const authMessage = document.querySelector('.auth-message');
            
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    authMessage.textContent = "Password reset email sent. Please check your inbox.";
                    authMessage.classList.remove('error');
                    authMessage.classList.add('success');
                })
                .catch((error) => {
                    authMessage.textContent = error.message;
                    authMessage.classList.remove('success');
                    authMessage.classList.add('error');
                });
        });
    }
});