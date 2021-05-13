// import { changeView } from './controller/route.js';
// import { checkSesionActive } from './controller/controller-route.js';
import {firebaseConfig} from './firebase-controllers/firebase-configuration.js';

// Your web app's Firebase configuration
import changeViews from './route-controller/routing.js';


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.performance();
const init = () => {
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () => changeViews(window.location.hash));
};
window.addEventListener('load', init);

// Cada vez que recargue ejecuta esta ()
