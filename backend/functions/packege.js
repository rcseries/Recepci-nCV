{
  "name": "recepcion-cv-backend",
  "version": "1.0.0",
  "description": "Cloud Functions para Recepción de CVs",
  "main": "src/index.js",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions"
  },
  "dependencies": {
    "firebase-admin": "^11.11.0",
    "firebase-functions": "^4.5.0"
  },
  "engines": {
    "node": "18"
  }
}