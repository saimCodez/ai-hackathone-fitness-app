/* auth.js - registration and login logic using localStorage */

// ============================================================
// STORAGE KEYS
// ============================================================

const STORAGE_KEYS = {
  registeredUsers: 'aiFitnessCoach.registeredUsers',
  currentSession: 'aiFitnessCoach.currentSession'
};

// ============================================================
// VALIDATION HELPERS
// ============================================================

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password
 */
function isValidPassword(password) {
  return password && password.length >= 6;
}

/**
 * Clear error messages on a form
 */
function clearErrors() {
  const errorElements = document.querySelectorAll('[id$="-error"]');

  errorElements.forEach(el => {
    el.textContent = '';

    // Support both Tailwind hidden and visually-hidden
    el.classList.add('hidden');
    el.classList.add('visually-hidden');
  });
}

/**
 * Display error message below a field
 */
function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);

  if (errorElement) {
    errorElement.textContent = message;

    // Remove both hiding classes
    errorElement.classList.remove('hidden');
    errorElement.classList.remove('visually-hidden');
  }
}

/**
 * Show Toastify message
 */
function showSuccess(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(135deg, #f97316, #fb923c)",
      color: "#ffffff",
      borderRadius: "12px",
      fontWeight: "600",
      boxShadow: "0 10px 30px rgba(249, 115, 22, 0.3)"
    }
  }).showToast();
}

/**
 * Show Toastify error
 */
function showToastError(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(135deg, #dc2626, #ef4444)",
      color: "#ffffff",
      borderRadius: "12px",
      fontWeight: "600",
      boxShadow: "0 10px 30px rgba(220, 38, 38, 0.3)"
    }
  }).showToast();
}

// ============================================================
// LOCALSTORAGE MANAGEMENT
// ============================================================

/**
 * Get all registered users
 */
function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.registeredUsers);

    return data ? JSON.parse(data) : [];

  } catch (error) {
    console.error('Error reading registered users:', error);
    return [];
  }
}

/**
 * Save all registered users
 */
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.registeredUsers,
      JSON.stringify(users)
    );

  } catch (error) {
    console.error('Error saving registered users:', error);
  }
}

/**
 * Get current logged-in user
 */
function getCurrentSession() {
  try {
    const data = localStorage.getItem(
      STORAGE_KEYS.currentSession
    );

    return data ? JSON.parse(data) : null;

  } catch (error) {
    console.error('Error reading current session:', error);
    return null;
  }
}

/**
 * Save current logged-in user
 */
function saveCurrentSession(user) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.currentSession,
      JSON.stringify(user)
    );

  } catch (error) {
    console.error('Error saving current session:', error);
  }
}

/**
 * Clear current session
 */
function clearCurrentSession() {
  try {
    localStorage.removeItem(
      STORAGE_KEYS.currentSession
    );

  } catch (error) {
    console.error('Error clearing current session:', error);
  }
}

/**
 * Check if user is logged in
 */
export function isUserLoggedIn() {
  return getCurrentSession() !== null;
}

/**
 * Get currently logged-in user
 */
export function getLoggedInUser() {
  return getCurrentSession();
}

// ============================================================
// SIGNUP FUNCTIONALITY
// ============================================================

/**
 * Handle signup form submission
 */
function handleSignup(event) {

  event.preventDefault();

  clearErrors();

  // Get form values
  const nameInput =
    document.getElementById('signup-name');

  const emailInput =
    document.getElementById('signup-email');

  const passwordInput =
    document.getElementById('signup-password');

  const confirmPasswordInput =
    document.getElementById('signup-password-confirm');

  const name =
    nameInput.value.trim();

  const email =
    emailInput.value.trim();

  const password =
    passwordInput.value;

  const confirmPassword =
    confirmPasswordInput.value;

  // ==========================================================
  // VALIDATION
  // ==========================================================

  let hasError = false;

  if (!name) {

    showError(
      'signup-name',
      'Please enter your full name.'
    );

    hasError = true;
  }

  if (!email) {

    showError(
      'signup-email',
      'Please enter your email.'
    );

    hasError = true;

  } else if (!isValidEmail(email)) {

    showError(
      'signup-email',
      'Please enter a valid email address.'
    );

    hasError = true;
  }

  if (!password) {

    showError(
      'signup-password',
      'Please enter a password.'
    );

    hasError = true;

  } else if (!isValidPassword(password)) {

    showError(
      'signup-password',
      'Password must be at least 6 characters.'
    );

    hasError = true;
  }

  if (!confirmPassword) {

    showError(
      'signup-password-confirm',
      'Please confirm your password.'
    );

    hasError = true;

  } else if (password !== confirmPassword) {

    showError(
      'signup-password-confirm',
      'Passwords do not match.'
    );

    hasError = true;
  }

  // If validation failed
  if (hasError) {

    showToastError(
      'Please fix the errors in the form.'
    );

    return;
  }

  // ==========================================================
  // CHECK DUPLICATE EMAIL
  // ==========================================================

  const registeredUsers =
    getRegisteredUsers();

  const emailExists =
    registeredUsers.some(
      u =>
        u.email.toLowerCase() ===
        email.toLowerCase()
    );

  if (emailExists) {

    showError(
      'signup-email',
      'This email is already registered. Please log in or use a different email.'
    );

    showToastError(
      'This email is already registered.'
    );

    return;
  }

  // ==========================================================
  // CREATE NEW USER
  // ==========================================================

  const newUser = {

    id: Date.now(),

    name: name,

    email: email,

    password: password,

    createdAt: new Date().toISOString()
  };

  // Save user
  registeredUsers.push(newUser);

  saveRegisteredUsers(
    registeredUsers
  );

  // ==========================================================
  // SUCCESS TOAST
  // ==========================================================

  showSuccess(
    `Welcome, ${name}! Your account has been created.`
  );

  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';

  // ==========================================================
  // KEEP YOUR EXISTING REDIRECT
  // ==========================================================

  setTimeout(() => {

    window.location.href =
      'profile.html';

  }, 500);
}

// ============================================================
// LOGIN FUNCTIONALITY
// ============================================================

/**
 * Handle login form submission
 */
function handleLogin(event) {

  event.preventDefault();

  clearErrors();

  // Get form values
  const emailInput =
    document.getElementById('login-email');

  const passwordInput =
    document.getElementById('login-password');

  const email =
    emailInput.value.trim();

  const password =
    passwordInput.value;

  // ==========================================================
  // VALIDATION
  // ==========================================================

  if (!email) {

    showError(
      'login-email',
      'Please enter your email.'
    );

    showToastError(
      'Please enter your email.'
    );

    return;
  }

  if (!password) {

    showError(
      'login-password',
      'Please enter your password.'
    );

    showToastError(
      'Please enter your password.'
    );

    return;
  }

  // ==========================================================
  // FIND USER
  // ==========================================================

  const registeredUsers =
    getRegisteredUsers();

  const user =
    registeredUsers.find(
      u =>
        u.email.toLowerCase() ===
        email.toLowerCase()
    );

  if (!user) {

    showError(
      'login-email',
      'No account found with this email. Please sign up first.'
    );

    showToastError(
      'No account found with this email.'
    );

    return;
  }

  // ==========================================================
  // VERIFY PASSWORD
  // ==========================================================

  if (user.password !== password) {

    showError(
      'login-password',
      'Incorrect password. Please try again.'
    );

    showToastError(
      'Incorrect password.'
    );

    return;
  }

  // ==========================================================
  // SUCCESSFUL LOGIN
  // ==========================================================

  const sessionUser = {

    id: user.id,

    name: user.name,

    email: user.email,

    createdAt: user.createdAt,

    loginTime: new Date().toISOString()
  };

  saveCurrentSession(
    sessionUser
  );

  // ==========================================================
  // SUCCESS TOAST
  // ==========================================================

  showSuccess(
    `Welcome back, ${user.name}!`
  );

  // ==========================================================
  // KEEP YOUR EXISTING REDIRECT
  // ==========================================================

  setTimeout(() => {

    window.location.href =
      'dashboard.html';

  }, 500);
}

// ============================================================
// LOGOUT FUNCTIONALITY
// ============================================================

/**
 * Handle logout
 */
export function handleLogout() {

  clearCurrentSession();

  window.location.href =
    'login.html';
}

// ============================================================
// PAGE INITIALIZATION
// ============================================================

/**
 * Initialize authentication on page load
 */
function initAuth() {

  // Get current page URL
  const currentPage =
    window.location.pathname;

  // ==========================================================
  // SIGNUP
  // ==========================================================

  if (
    currentPage.includes('signup.html')
  ) {

    const signupForm =
      document.getElementById(
        'signup-form'
      );

    if (signupForm) {

      signupForm.addEventListener(
        'submit',
        handleSignup
      );

    }
  }

  // ==========================================================
  // LOGIN
  // ==========================================================

  if (
    currentPage.includes('login.html')
  ) {

    const loginForm =
      document.getElementById(
        'login-form'
      );

    if (loginForm) {

      loginForm.addEventListener(
        'submit',
        handleLogin
      );

    }
  }

  // ==========================================================
  // DASHBOARD LOGOUT
  // ==========================================================

  if (
    currentPage.includes('dashboard.html')
  ) {

    const logoutBtn =
      document.getElementById(
        'logout-btn'
      );

    if (logoutBtn) {

      logoutBtn.addEventListener(
        'click',
        handleLogout
      );

    }
  }
}

// ============================================================
// INITIALIZE AUTH
// ============================================================

if (
  document.readyState === 'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    initAuth
  );

} else {

  initAuth();
}

// ============================================================
// EXPORTS
// ============================================================

export default {

  isUserLoggedIn,

  getLoggedInUser,

  handleLogout

};