import { logOut } from '../firebase-controllers/auth-controller.js';

const menu = () => {
  const header = document.getElementById('header');
  const viewMenu = `
  <nav  id="menu">
  <ul>
      <li class="home-header"><a href="#/home"><span class="the-home"><i class="fas fa-home"></i></span>Inicio</a></li>
      <li class="profile-header"><a href="#/home"><span class="the-home"><i class="fas fa-user-circle"></i></span>Perfil</a></li>
      <a href="#/home"><img src="img/airplane.png" class="icon"></a></li>
      <li id="logOut-header"><a href="#/home"><span class="the-home"><i class="fas fa-sign-out-alt"></i></span>Cerrar sesión</a></li>
  </ul>
</nav>
    `;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewMenu;

  // Cerrar sesión
  const bottomLogout = divElement.querySelector('#logOut-header');
  bottomLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logOut().then(() => {
      console.log('logOut...');
      window.location.hash = '#/';
    });
  });

  return divElement;
  // return viewMenu;
};
export default menu;
