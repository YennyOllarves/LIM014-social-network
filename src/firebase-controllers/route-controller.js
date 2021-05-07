// cuando usuario inica sesión + reconoce
const recognizesLogin = (sesionActive) => firebase.auth().onAuthStateChanged((user) => {
  let locationRoute = '';
  if (window.location.hash === '#/loginPage') locationRoute = '#/loginPage';
  if (window.location.hash === '#/registrationPage') locationRoute = '#/loginPage';
  if (user) {
    locationRoute = window.location.hash;
  }
  return sesionActive(locationRoute);
});

// el usuario al estar activo, carga la ruta donde esta ubicado
// se asigna rutas específicas
export {
  recognizesLogin,
};
