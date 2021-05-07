// PLANTILLA ELEMENTOS DEL MENU DESPLEGABLE (HEADER)

export default () => {
  const viewMenu = document.createElement('section');
  viewMenu.classList.add('main-header');
  viewMenu.innerHTML = `
    <nav>
      <ul class="menu-header">
        <div id="left-menu-header" class= "box">
          <li class="home-header"><a href="#/inicio"><span class="fas fa-home sitio-web--icon"> Inicio </span></a></li>
          <li class="profile-header"><a href="#/profile"><span class="fas fa-user-circle"> Profile </span></a></li>
        </div>
        <li id="log-out-header" class="box"><span class="fas fa-power-off"> Cerrar sesión </span></li>
      </ul>
    </nav>
    <i id="hamburger-menu" class="fas fa-bars hide"></i>
    `;
};
