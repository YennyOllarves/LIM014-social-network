import { logOut, loginEmail } from '../firebase-controllers/auth-controller.js';

const menu = (user) => {
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
const auth = firebase.auth();

 const logout= divElement.querySelector('#logOut-header');
 logout.addEventListener('click',(e) => {
    e.preventDefault();
    container.innerHTML ='';
    window.location.hash ='#/login';
   logOut().then(() => {
     console.log('ya salio');
   })
 })
  // const bottomLogout = divElement.querySelector('#logOut-header');
  // bottomLogout.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   logOut().then(() => {
  //     console.log('logOut...');
  //     window.location.hash = '#/login';
  //   });
  // });
  
  return divElement;
  // return viewMenu;
};
export default menu;
