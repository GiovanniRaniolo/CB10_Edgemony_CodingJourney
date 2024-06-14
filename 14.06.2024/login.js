document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.getElementById('login-button');
    const userInfo = document.getElementById('user-info');
    const userNameSpan = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');
    const productManagement = document.getElementById('product-management');

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!isLoggedIn) {
        // Show login modal if not logged in
        loginModal.style.display = 'block';
    } else {
        // Show user info and product management form if logged in
        userInfo.style.display = 'flex';
        userNameSpan.textContent = loggedInUser;
        productManagement.style.display = 'flex';
    }

    // Handle login button click
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Perform simple validation and simulate registration/login
        if (username && password) {
            // Set login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', username);

            // Show user info and product management form
            userInfo.style.display = 'flex';
            userNameSpan.textContent = username;
            productManagement.style.display = 'flex';

            // Hide login modal
            loginModal.style.display = 'none';
        } else {
            alert('Please enter a valid username and password');
        }
    });

    // Handle logout button click
    logoutButton.addEventListener('click', () => {
        // Clear login status in localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');

        // Hide user info and product management form
        userInfo.style.display = 'none';
        productManagement.style.display = 'none';

        // Show login modal
        loginModal.style.display = 'block';
    });
});
