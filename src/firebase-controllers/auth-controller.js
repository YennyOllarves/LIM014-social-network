// Login UserPass
const loginEmail = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

// Login Google
const loginGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithRedirect(googleProvider);
  // return auth.signInWithPopup(googleProvider);
};

// Creación de Usuarios
 const userRegister = (email, password) => { // consulta de agregar name al parametro
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};

// Verificar Mail
<<<<<<< HEAD
const checkMail = () => {
=======
 const checkMail = () => {
