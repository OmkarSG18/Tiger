/**
 * CredAlt — Login Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language selector on login page
    buildLanguageSelector('loginLangSwitcher');
});

function selectRole(roleKey) {
    // Navigate to dashboard with role param
    window.location.href = `dashboard.html?role=${encodeURIComponent(roleKey)}`;
}
