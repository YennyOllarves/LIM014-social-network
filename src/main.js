// Este es el punto de entrada de tu aplicacion

import changeViews from './routeController/routing.js';
const init = () => {
    changeViews(window.location.hash);
    window.addEventListener('hashchange' , () => changeViews(window.location.hash));
}
window.addEventListener('load', init); //Cada vez que recargue ejecuta esta ()
