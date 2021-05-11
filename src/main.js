// import { changeView } from './controller/route.js';
// import { checkSesionActive } from './controller/controller-route.js';

// Your web app's Firebase configuration
import changeViews from './route-controller/routing.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBG1DkKiw5oz-iRMTKNe2obupYyl1Hu0dg',
  authDomain: 'travelingsoul-505.firebaseapp.com',
  projectId: 'travelingsoul-505',
  storageBucket: 'travelingsoul-505.appspot.com',
  messagingSenderId: '614173768389',
  appId: '1:614173768389:web:3f1b707688c1f909f94eac',
  measurementId: 'G-32JX1ZKZ07',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.performance();
const init = () => {
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () => changeViews(window.location.hash));
};
window.addEventListener('load', init);

// Cada vez que recargue ejecuta esta ()
