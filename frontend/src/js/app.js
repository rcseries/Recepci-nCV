import { verificarSesion, logout } from './services/authService.js';

// Verificar sesión al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const sesion = verificarSesion();
    
    if (!sesion.autenticado) {
        // Redirigir al login si no hay sesión
        window.location.href = '/login.html';
        return;
    }
    
    // Mostrar el usuario en la interfaz
    const usuarioDisplay = document.getElementById('usuarioDisplay');
    if (usuarioDisplay) {
        usuarioDisplay.textContent = sesion.usuario;
    }
    
    // Configurar botón de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logout();
        });
    }
});

// También verificar sesión al regresar a la página (con bfcache)
window.addEventListener('pageshow', () => {
    const sesion = verificarSesion();
    if (!sesion.autenticado) {
        window.location.href = '/login.html';
    }
});