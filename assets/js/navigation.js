/**
 * Navigation and Sidebar Management
 * Handles active states and mobile responsiveness
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    initSidebar();
    initMobileMenu();
    
    // Set active nav item based on current page
    setActiveNavItem();
    
    // Update welcome message
    updateWelcomeMessage();
});

/**
 * Initialize main navigation
 */
function initNavigation() {
    // Add scroll effect to main navigation
    const nav = document.querySelector('.main-nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
                nav.style.backgroundColor = 'var(--white)';
            }
        });
    }
}

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!sidebar || !mobileMenuBtn) return;
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        const isMobile = window.innerWidth <= 1024;
        
        if (!isClickInsideSidebar && !isClickOnMenuBtn && isMobile && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
    
    // Handle sidebar nav item clicks
    const navItems = sidebar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.classList.contains('logout-item')) {
                return; // Let logout handle its own click
            }
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('show');
            }
        });
    });
    
    // Handle logout
    const logoutItem = document.querySelector('.logout-item');
    if (logoutItem) {
        logoutItem.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('tiet_user');
                window.location.href = 'login.html';
            }
        });
    }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('show');
        });
    }
}

/**
 * Set active navigation item based on current page
 */
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    
    if (!navItems.length) return;
    
    // Remove active class from all items first
    navItems.forEach(item => item.classList.remove('active'));
    
    // Map page names
    const pageMap = {
        'dashboard.html': 'dashboard',
        'my-courses.html': 'courses',
        'my-projects.html': 'projects',
        'my-timesheets.html': 'timesheets',
        'my-interviews.html': 'interviews',
        'achievements.html': 'achievements',
        'daily-goals.html': 'goals',
        'announcements.html': 'announcements',
        'my-profile.html': 'profile'
    };
    
    const currentPageKey = pageMap[currentPage];
    
    if (currentPageKey) {
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.includes(currentPageKey)) {
                item.classList.add('active');
            }
        });
    }
}

/**
 * Update welcome message with student name
 */
function updateWelcomeMessage() {
    const userData = localStorage.getItem('tiet_user');
    const welcomeElement = document.querySelector('.welcome-message');
    const userNameElement = document.querySelector('.user-name');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            const userName = user.name || 'Student';
            
            if (welcomeElement) {
                welcomeElement.textContent = `Welcome back, ${userName}!`;
            }
            
            if (userNameElement) {
                userNameElement.textContent = userName;
            }
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
}

/**
 * Load mock data for dashboard
 */
function loadDashboardData() {
    // Mock data for dashboard cards
    const dashboardData = {
        enrolledCourses: 5,
        ongoingProjects: 3,
        upcomingInterviews: 2,
        todaysGoals: 4
    };
    
    // Update dashboard cards if they exist
    Object.keys(dashboardData).forEach(key => {
        const elements = document.querySelectorAll(`.${key}`);
        elements.forEach(el => {
            if (el.tagName === 'H3') {
                el.textContent = dashboardData[key];
            }
        });
    });
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Check if user is logged in, redirect if not
 */
function checkAuth() {
    const userData = localStorage.getItem('tiet_user');
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (!userData && !isLoginPage) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (userData && isLoginPage) {
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

/**
 * Initialize page with common functionality
 */
function initPage() {
    // Set current date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Check authentication for protected pages
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('index.html')) {
        checkAuth();
    }
}

// Run page initialization
initPage();

// Export functions for use in other files
window.navigation = {
    initNavigation,
    initSidebar,
    initMobileMenu,
    setActiveNavItem,
    updateWelcomeMessage,
    loadDashboardData,
    formatDate,
    checkAuth,
    initPage
};