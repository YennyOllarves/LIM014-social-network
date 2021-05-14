// Cerrar sesión
const bottomLogout = document.querySelector('.logOut-header');
bottomLogout.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = '';
  
});
