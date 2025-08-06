// In scripts/app.js

document.addEventListener('DOMContentLoaded', function() {
    // --- This function handles the Login/Profile button visibility ---
    updateUserStatus();

    // --- This handles the logout button functionality ---
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function updateUserStatus() {
    const loginButton = document.getElementById('login-btn');
    const profileButton = document.getElementById('profile-btn');

    if (loginButton && profileButton) {
        if (localStorage.getItem('userIsLoggedIn') === 'true') {
            // If logged in, show Profile and hide Login
            loginButton.style.display = 'none';
            profileButton.style.display = 'block';
        } else {
            // If not logged in, show Login and hide Profile
            loginButton.style.display = 'block';
            profileButton.style.display = 'none';
        }
    }
}

function handleLogout(event) {
    event.preventDefault(); // Prevent the link from navigating anywhere
    localStorage.removeItem('userIsLoggedIn');
    alert('You have been logged out.');
    window.location.href = 'home.html'; // Go to homepage after logout
}