import '/style.css'

const modules = {
    'renta': {
        title: 'El Código de la Renta Vitalicia',
        src: 'https://gamma.app/embed/8e5vb956sa5k8fz'
    },
    'ordenando': {
        title: 'Ordenando la Casa',
        src: 'https://gamma.app/embed/iz11i3vijj7m9al'
    },
    'carteras': {
        title: 'Las 3 Carteras de Oro',
        src: 'https://gamma.app/embed/8olyk379vbwnayg'
    },
    'globales': {
        title: 'Inversiones Globales',
        src: 'https://gamma.app/embed/wzj33657bn6s9zt'
    },
    'herederos': {
        title: 'Fábrica de Herederos',
        src: 'https://gamma.app/embed/qxq60fg0ncyxihn'
    }
};

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const email = localStorage.getItem('userEmail');

if (!email) {
    // Validate login for safety
    window.location.href = '/login/';
}

const moduleData = modules[id];

if (!moduleData) {
    if (email) window.location.href = '/dashboard/';
} else {
    document.title = `${moduleData.title} - Membresía`;
    document.getElementById('moduleTitle').textContent = moduleData.title;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = moduleData.src;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'fullscreen';
    // Gamma uses responsive embeds, let's treat it as a full-screen app view

    const container = document.getElementById('iframeContainer');

    // Small delay to ensure smooth transition perception
    setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(iframe);
    }, 300);
}
