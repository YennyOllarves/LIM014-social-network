// Login UserPass
const loginEmail = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

// Login Google
const loginGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};

// Creación de Usuarios
const userRegister = (email, password) => { // consulta de agregar name al parametro
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};

// observador
const onAuthStateChanged = (callback) => {
  firebase.auth().onAuthStateChanged(callback);
};

// Verificar Mail
const checkMail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};

// usuario actual
const currentUser = () => firebase.auth().currentUser;

// Cerrar Sesión
const logOut = () => firebase.auth().logOut;

export {
  loginEmail,
  loginGoogle,
  userRegister,
  checkMail,
  logOut,
  currentUser,
  onAuthStateChanged,
};
