// Importar Firebase Admin SDK
const admin = require('firebase-admin');

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'recepcioncv'
});

// Obtener Firestore
const db = admin.firestore();

// Función para crear usuario inicial (solo una vez)
// Ejecutar con: firebase functions:shell --project=recepcioncv
// Luego: createInitialUser()
exports.createInitialUser = async (req, res) => {
  try {
    const usuario = 'recepcioncv';
    const passwordHash = '$2b$10$demoHash'; // Por ahora, demo
    
    await db.collection('usuarios').doc(usuario).set({
      usuario: usuario,
      password: passwordHash,
      fechaCreacion: admin.firestore.FieldValue.serverTimestamp(),
      ultimoAcceso: null,
      activo: true
    });
    
    res.send('✅ Usuario creado exitosamente');
  } catch (error) {
    res.status(500).send('❌ Error: ' + error.message);
  }
};

// Función para verificar credenciales (Cloud Function)
exports.verificarLogin = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    
    // Validar datos
    if (!usuario || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Usuario y contraseña son requeridos' 
      });
    }
    
    // Buscar usuario en Firestore
    const docRef = db.collection('usuarios').doc(usuario);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(401).json({ 
        success: false, 
        error: 'Usuario o contraseña incorrectos' 
      });
    }
    
    const userData = doc.data();
    
    // Verificar contraseña (comparación simple por ahora)
    // Nota: Debes usar bcrypt en producción
    if (password !== userData.password) {
      return res.status(401).json({ 
        success: false, 
        error: 'Usuario o contraseña incorrectos' 
      });
    }
    
    // Actualizar último acceso
    await docRef.update({
      ultimoAcceso: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Devolver éxito
    res.json({
      success: true,
      usuario: usuario,
      mensaje: 'Login exitoso'
    });
    
  } catch (error) {
    console.error('Error en verificarLogin:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error en el servidor' 
    });
  }
};