/* app.js - shared application initialization and page protection logic */

import { isUserLoggedIn, getLoggedInUser } from './auth.js';

// ============================================================
// PAGE PROTECTION & REDIRECTS
// ============================================================

/**
 * Get current page filename
 */
function getCurrentPageName() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}

/**
 * Check if current page requires authentication
 */
function isProtectedPage() {
  const currentPage = getCurrentPageName();
  return currentPage === 'dashboard.html';
}

/**
 * Check if current page is auth-only (login/signup)
 */
function isAuthOnlyPage() {
  const currentPage = getCurrentPageName();
  return currentPage === 'login.html' || currentPage === 'signup.html';
}

/**
 * Initialize page protection
 */
function initPageProtection() {
  const isLoggedIn = isUserLoggedIn();
  const currentPage = getCurrentPageName();

  // DASHBOARD PROTECTION: Must be logged in
  if (isProtectedPage()) {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      window.location.href = 'login.html';
      return;
    }
  }

  // REDIRECT LOGGED-IN USERS FROM LOGIN/SIGNUP
  if (isAuthOnlyPage()) {
    if (isLoggedIn) {
      // Redirect to dashboard if already logged in
      window.location.href = 'dashboard.html';
      return;
    }
  }
}

// ============================================================
// USER INFO DISPLAY
// ============================================================

/**
 * Display logged-in user's name on dashboard
 */
function displayUserInfo() {
  if (!isUserLoggedIn()) {
    return;
  }

  const user = getLoggedInUser();
  if (!user) {
    return;
  }

  // Update user name display
  const userNameElement = document.getElementById('user-name');
  if (userNameElement) {
    userNameElement.textContent = user.name;
  }

  // If there's a top username display, update that too
  const topUsernameElement = document.getElementById('top-username');
  if (topUsernameElement) {
    topUsernameElement.innerHTML = `Hi, <span id="user-name">${user.name}</span>`;
  }
}

// ============================================================
// INITIALIZATION
// ============================================================

/**
 * Initialize app when DOM is ready
 */
function initApp() {
  // Check page protection first (before anything else loads)
  initPageProtection();

  // Display user info if on dashboard
  if (getCurrentPageName() === 'dashboard.html') {
    displayUserInfo();
  }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

export { isUserLoggedIn, getLoggedInUser };
