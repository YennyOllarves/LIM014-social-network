// eslint-disable-next-line import/named
import components  from '../components/index.js';
/* import { getUserData } from '../firebase-controllers/fireStore-controller.js';
import {currentUser} from '../firebase-controllers/auth-controller.js'; */

const changeViews = (route) => {
  const container = document.getElementById('container');
  const header = document.getElementById('header');
  window.location.hash = route;
  container.innerHTML = '';
  header.innerHTML = '';
  switch (route) {
    case '#/login':
      container.appendChild(components.login());
      // components.login.init();
      break;
    case '#/register':
      container.appendChild(components.register());
      // container.register.init();
      break;
    case '#/home':
      header.appendChild(components.menuHeader());
      // header.menuHeader.init();

      break;
    default:
      break;
  }
};

export default changeViews;
