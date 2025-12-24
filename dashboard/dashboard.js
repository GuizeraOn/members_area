import '/style.css'

const email = localStorage.getItem('userEmail');
if (!email) {
    window.location.href = '/login/';
} else {
    document.getElementById('userEmailDisplay').textContent = email;
}

// Add scroll animation or simple load effect
document.querySelectorAll('a').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
        el.style.transition = 'all 0.5s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, index * 100);
});
