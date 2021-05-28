import { logOut } from '../firebase-controllers/auth-controller.js';

const menu = () => {
  const viewMenu = document.createElement('section');
  viewMenu.innerHTML = `
  
<body>
  <nav class= "topnav">
    <a href= "#/home" class= "logo">
      <ul class= "menu">
        <li class="home-header"><a href="#/home"><span class="the-home"><i class="fas fa-home"></i></span>Inicio</a></li>
        <li class="profile-header"><a href="#/home"><span class="the-home"><i class="fas fa-user-circle"></i></span>Perfil</a></li>
        <li id="logOut-header"><a href="#/home"><span class="the-home"><i class="fas fa-sign-out-alt"></i></span>Cerrar sesión</a></li>
        <button class= "abrir-menu"><i id="hamburger-menu" class="fas fa-bars hide"></i></button>
    </ul>
    </a>
  </nav>
</body>
    `;
  const hamburgerMenu = viewMenu.querySelector('#hamburger-menu');
  const leftMenu = viewMenu.querySelector('#left-menu-header');
  const rightMenu = viewMenu.querySelector('#log-out-header');
  hamburgerMenu.addEventListener('click', () => {
    leftMenu.classList.toggle('active');
    rightMenu.classList.toggle('active');
  });

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
