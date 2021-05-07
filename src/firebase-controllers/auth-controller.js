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
const userRegister = (email, password) => {
const auth = firebase.auth();
return auth.createUserWithEmailAndPassword(email, password);
};

// Verificar Mail
const checkMail = () => {
    const user = firebase.auth().currentUser();
    return user.sendEmailVerification();

};

const currentUser = firebase.auth().currentUser();

// Cerrar Sesión
const logOut = () => firebase.auth().singOut();


// Recuperar Pass
/* const recoverPassword = (email) => {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email);
} */



export {
    loginEmail,
    loginGoogle,
    userRegister,
    checkMail,
    logOut



}  