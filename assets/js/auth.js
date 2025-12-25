/**
 * Authentication Form Handling
 * Frontend validation only - no backend integration
 */

// document.addEventListener('DOMContentLoaded', function() {
//     initAuthForm();
//     initDemoLogin();
// });

/**
 * Initialize authentication form
 */
function initAuthForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    // Clear any existing validation states
    clearValidation();
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            performLogin();
        }
    });
    
    // Real-time validation for email/ID field
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this.value);
        });
        
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value);
        });
    }
    
    // Real-time validation for password field
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });
        
        passwordInput.addEventListener('blur', function() {
            validatePassword(this.value);
        });
    }
}

/**
 * Validate the entire form
 */
function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    
    // Validate email/ID
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate email/student ID
 */
function validateEmail(email) {
    const emailError = document.getElementById('emailError');
    const emailInput = document.getElementById('email');
    
    if (!email) {
        showError(emailInput, emailError, 'Email or Student ID is required');
        return false;
    }
    
    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check for student ID format (alphanumeric, 6-12 characters)
    const studentIdRegex = /^[A-Z0-9]{6,12}$/i;
    
    if (!emailRegex.test(email) && !studentIdRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email or student ID');
        return false;
    }
    
    showSuccess(emailInput, emailError);
    return true;
}

/**
 * Validate password
 */
function validatePassword(password) {
    const passwordError = document.getElementById('passwordError');
    const passwordInput = document.getElementById('password');
    
    if (!password) {
        showError(passwordInput, passwordError, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        return false;
    }
    
    showSuccess(passwordInput, passwordError);
    return true;
}

/**
 * Show error state for input field
 */
function showError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Show success state for input field
 */
function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

/**
 * Clear all validation states
 */
function clearValidation() {
    const inputs = document.querySelectorAll('.form-control');
    const errors = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    errors.forEach(error => {
        error.classList.remove('show');
    });
}

/**
 * Perform login (frontend simulation only)
 */
function performLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    // Show loading state
    const submitBtn = document.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Demo credentials check
        if ((email === 'student@tiet.edu' || email === 'STUDENT123') && password === 'password123') {
            // Store demo session data
            const userData = {
                name: 'John Doe',
                email: email,
                studentId: 'STUDENT123',
                course: 'Full Stack Development',
                branch: 'Pernambut',
                loginTime: new Date().toISOString(),
                remember: rememberMe
            };
            
            // Store in localStorage for demo purposes
            localStorage.setItem('tiet_user', JSON.stringify(userData));
            
            // Show success message
            showLoginSuccess();
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Show error message
            showLoginError();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

/**
 * Show login success message
 */
function showLoginSuccess() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'login-success';
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        ">
            <i class="fas fa-check-circle"></i>
            <span>Login successful! Redirecting to dashboard...</span>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

/**
 * Show login error message
 */
function showLoginError() {
    // Create error message element
    const errorMsg = document.createElement('div');
    errorMsg.className = 'login-error';
    errorMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        ">
            <i class="fas fa-exclamation-circle"></i>
            <span>Invalid credentials. Use demo credentials to login.</span>
        </div>
    `;
    
    document.body.appendChild(errorMsg);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        errorMsg.remove();
    }, 5000);
}

/**
 * Initialize demo login functionality
 */
function initDemoLogin() {
    const demoBtn = document.getElementById('demoLogin');
    if (!demoBtn) return;
    
    demoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Fill demo credentials
        document.getElementById('email').value = 'student@tiet.edu';
        document.getElementById('password').value = 'password123';
        document.getElementById('remember').checked = true;
        
        // Trigger validation
        validateEmail('student@tiet.edu');
        validatePassword('password123');
        
        // Show demo credentials info
        const demoInfo = document.querySelector('.demo-credentials');
        if (demoInfo) {
            demoInfo.style.display = 'block';
        }
    });
}

// Export functions for testing
window.auth = {
    validateForm,
    validateEmail,
    validatePassword,
    performLogin
};