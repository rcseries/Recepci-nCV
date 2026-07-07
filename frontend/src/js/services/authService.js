import { db } from '../config/firebase.js';
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Función para hacer login (sin email, solo usuario y contraseña)
export async function login(usuario, password) {
  try {
    // 1. Buscar el usuario en Firestore
    const userDocRef = doc(db, 'usuarios', usuario);
    const userDoc = await getDoc(userDocRef);
    
    // 2. Verificar si el usuario existe
    if (!userDoc.exists()) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    
    // 3. Obtener datos del usuario
    const userData = userDoc.data();
    
    // 4. Verificar contraseña (usando bcryptjs en el frontend)
    // Nota: Para seguridad, la verificación se hará en Cloud Functions
    // Por ahora, usamos una comparación simple (luego la mejoramos)
    if (password !== userData.password) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    
    // 5. Actualizar último acceso
    await updateDoc(userDocRef, {
      ultimoAcceso: new Date().toISOString()
    });
    
    // 6. Guardar sesión en localStorage
    localStorage.setItem('usuario', usuario);
    localStorage.setItem('sesionActiva', 'true');
    
    return { success: true, usuario };
    
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, error: error.message };
  }
}

// Función para verificar si hay sesión activa
export function verificarSesion() {
  const usuario = localStorage.getItem('usuario');
  const sesionActiva = localStorage.getItem('sesionActiva');
  
  if (usuario && sesionActiva === 'true') {
    return { autenticado: true, usuario };
  }
  
  return { autenticado: false };
}

// Función para cerrar sesión
export function logout() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('sesionActiva');
  window.location.href = '/login.html';
}