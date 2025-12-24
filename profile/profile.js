import '/style.css'

const email = localStorage.getItem('userEmail');
if (!email) {
    window.location.href = '/login/';
} else {
    document.getElementById('userEmail').textContent = email;
    // Simple logic to extract name from email or set default
    const namePart = email.split('@')[0];
    const derivedName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace(/[._0-9]/g, ' ');
    document.getElementById('userName').textContent = derivedName || "Socio Fundador";
}
