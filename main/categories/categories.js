document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Menú Hamburguesa para Móvil ---
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });});