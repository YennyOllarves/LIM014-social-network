import { logOut } from '../firebase-controllers/auth-controller.js';

const menu = () => {
  const viewMenu = document.createElement('section');
  viewMenu.innerHTML = `
  <id="menu-button">
      <label for="menu-button"><i class="fas fa-bars"></i>
      </label>
  <nav  id="menu">
  <ul>
      <li class="home-header"><a href="#/home"><span class="the-home"><i class="fas fa-home"></i></span>Inicio</a></li>
      <li class="profile-header"><a href="#/home"><span class="the-home"><i class="fas fa-user-circle"></i></span>Perfil</a></li>
      <a href="#/home"><img src="img/airplane.png" class="icon"></a></li>
      <a href="#/home" class= "hamburguer>
      <i id="hamburger-menu" class="fas fa-bars hide"></i>
      </a>
      <li id="logOut-header"><a href="#/home"><span class="the-home"><i class="fas fa-sign-out-alt"></i></span>Cerrar sesión</a></li>
  </ul>
  </nav>

    `;

  // Cerrar sesión
  const logout = viewMenu.querySelector('#logOut-header');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/login';
    logOut();
  });

  return viewMenu;
};
export default menu;
