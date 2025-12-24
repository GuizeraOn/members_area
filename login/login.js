import '/style.css'

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (email && email.includes('@')) {
        localStorage.setItem('userEmail', email);
        window.location.href = '/dashboard/';
    }
});

// --- Modal Logic ---
const modal = document.getElementById('installModal');
const openBtn = document.getElementById('installBtn');
const closeBtn = document.getElementById('closeModal');
const backdrop = document.getElementById('modalBackdrop');

const tabAndroid = document.getElementById('tabAndroid');
const tabIOS = document.getElementById('tabIOS');
const contentAndroid = document.getElementById('contentAndroid');
const contentIOS = document.getElementById('contentIOS');

// Open/Close
openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
backdrop.addEventListener('click', () => modal.classList.add('hidden'));

// Tab Switching
tabAndroid.addEventListener('click', () => {
    // Activate Android
    tabAndroid.classList.add('text-brand-neon', 'border-brand-neon', 'bg-white/5');
    tabAndroid.classList.remove('text-gray-500', 'border-transparent');

    // Deactivate iOS
    tabIOS.classList.remove('text-brand-neon', 'border-brand-neon', 'bg-white/5');
    tabIOS.classList.add('text-gray-500', 'border-transparent'); // Note: removed hover logic for simplicity in js, css handles it

    contentAndroid.classList.remove('hidden');
    contentIOS.classList.add('hidden');
});

tabIOS.addEventListener('click', () => {
    // Activate iOS
    tabIOS.classList.add('text-brand-neon', 'border-brand-neon', 'bg-white/5');
    tabIOS.classList.remove('text-gray-500', 'border-transparent');

    // Deactivate Android
    tabAndroid.classList.remove('text-brand-neon', 'border-brand-neon', 'bg-white/5');
    tabAndroid.classList.add('text-gray-500', 'border-transparent');

    contentIOS.classList.remove('hidden');
    contentAndroid.classList.add('hidden');
});
