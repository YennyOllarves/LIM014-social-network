import components from '../components/index.js';
import { onAuthStateChanged } from '../firebase-controllers/auth-controller.js';
import { getUserData } from '../firebase-controllers/fireStore-controller.js';

const changeViews = (route) => {
  const container = document.getElementById('container');
  const header = document.getElementById('header');
  window.location.hash = route;
  container.innerHTML = '';
  header.innerHTML = '';
  switch (route) {
    case '#/login':
      container.appendChild(components.login());
      break;
    case '#/register':
      container.appendChild(components.register());
      break;
    case '#/home':
      header.appendChild(components.menuHeader());
      onAuthStateChanged((user) => {
        if (user) {
          getUserData(user.uid).then((doc) => {
            header.appendChild(components.home(doc.data()));
          });
        }
      });
      break;

    default:
      break;
  }
};

export default changeViews;
