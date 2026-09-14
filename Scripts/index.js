// Detección y aplicación inmediata de tema para evitar parpadeos
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }

    // Redirección inmediata al punto de entrada conservando parámetros y hashes
    const targetUrl = 'Estructura/inicio.html' + window.location.search + window.location.hash;
    window.location.replace(targetUrl);
})();
