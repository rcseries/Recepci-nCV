import { login } from '../services/authService.js';

// Obtener elementos del DOM
const form = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const mensajeError = document.getElementById('mensajeError');
const loginButton = document.getElementById('loginButton');

// Verificar si ya hay sesión activa
window.addEventListener('load', () => {
    const sesion = localStorage.getItem('sesionActiva');
    const usuario = localStorage.getItem('usuario');
    
    if (sesion === 'true' && usuario) {
        // Redirigir al dashboard
        window.location.href = '/index.html';
    }
});

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Ocultar mensaje de error anterior
    mensajeError.style.display = 'none';
    
    // Deshabilitar botón
    loginButton.disabled = true;
    loginButton.textContent = '⏳ Verificando...';
    
    // Obtener datos
    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value;
    
    // Validar campos vacíos
    if (!usuario || !password) {
        mostrarError('Por favor, completa todos los campos');
        return;
    }
    
    // Intentar login
    const resultado = await login(usuario, password);
    
    // Habilitar botón
    loginButton.disabled = false;
    loginButton.textContent = '✅ Ingresar';
    
    if (resultado.success) {
        // Redirigir al dashboard
        window.location.href = '/index.html';
    } else {
        // Mostrar error
        mostrarError(resultado.error || 'Usuario o contraseña incorrectos');
    }
});

// Función para mostrar errores
function mostrarError(mensaje) {
    mensajeError.textContent = `❌ ${mensaje}`;
    mensajeError.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        mensajeError.style.display = 'none';
    }, 5000);
}