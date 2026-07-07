// Usuario y contraseña fijos
const USUARIO_VALIDO = 'recepcioncv';
const CONTRASENA_VALIDA = 'recepcioncv';

// Función para hacer login (validación directa)
export function login(usuario, password) {
  // Validar credenciales
  if (usuario === USUARIO_VALIDO && password === CONTRASENA_VALIDA) {
    // Guardar sesión en localStorage
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('sesionActiva', 'true');
    localStorage.setItem('fechaIngreso', new Date().toISOString());
    
    return { success: true, usuario };
  } else {
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  }
}

// Función para verificar si hay sesión activa
export function verificarSesion() {
  const usuario = localStorage.getItem('usuario');
  const sesionActiva = localStorage.getItem('sesionActiva');
  
  if (usuario === USUARIO_VALIDO && sesionActiva === 'true') {
    return { autenticado: true, usuario };
  }
  
  return { autenticado: false };
}

// Función para cerrar sesión
export function logout() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('sesionActiva');
  localStorage.removeItem('fechaIngreso');
  window.location.href = '/login.html';
}

// Función para cambiar la contraseña (opcional)
export function cambiarContrasena(nuevaContrasena) {
  // Nota: Esto solo cambia la contraseña en memoria, no es persistente
  // Para persistencia, necesitarías guardarla en Firestore o en otro lado
  console.warn('Esta función solo cambia la contraseña en memoria');
  // CONTRASENA_VALIDA = nuevaContrasena; // No se puede reasignar una constante
  // Mejor usar una variable global o Firestore
  return { success: false, error: 'Funcionalidad en desarrollo' };
}