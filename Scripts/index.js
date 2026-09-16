(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }

    const targetUrl = 'Estructura/inicio.html' + window.location.search + window.location.hash;
    window.location.replace(targetUrl);
})();
