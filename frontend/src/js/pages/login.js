import { login, verificarSesion } from '../services/authService.js';

// Obtener elementos del DOM
const form = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const mensajeError = document.getElementById('mensajeError');
const loginButton = document.getElementById('loginButton');

// Verificar si ya hay sesión activa
window.addEventListener('load', () => {
    const sesion = verificarSesion();
    if (sesion.autenticado) {
        // Redirigir al dashboard
        window.location.href = '/index.html';
    }
});

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Ocultar mensaje de error anterior
    mensajeError.style.display = 'none';
    
    // Deshabilitar botón y mostrar estado de carga
    loginButton.disabled = true;
    loginButton.innerHTML = '<span class="cargando"></span> Verificando...';
    
    // Obtener datos
    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value;
    
    // Validar campos vacíos
    if (!usuario || !password) {
        mostrarError('Por favor, completa todos los campos');
        resetButton();
        return;
    }
    
    // Simular un pequeño retraso para dar feedback visual
    setTimeout(() => {
        // Intentar login
        const resultado = login(usuario, password);
        
        if (resultado.success) {
            // Redirigir al dashboard
            window.location.href = '/index.html';
        } else {
            // Mostrar error
            mostrarError(resultado.error || 'Usuario o contraseña incorrectos');
            resetButton();
        }
    }, 800);
});

// Función para mostrar errores
function mostrarError(mensaje) {
    mensajeError.textContent = `❌ ${mensaje}`;
    mensajeError.style.display = 'block';
    
    // Scroll al mensaje de error
    mensajeError.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para resetear el botón
function resetButton() {
    loginButton.disabled = false;
    loginButton.textContent = '✅ Ingresar';
}

// Permitir login con Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !loginButton.disabled) {
        form.dispatchEvent(new Event('submit'));
    }
});

// Auto-focus en el campo usuario
usuarioInput.focus();