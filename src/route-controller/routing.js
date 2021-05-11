import components from '../components/index.js';

const changeViews = (route) => {
  const container = document.getElementById('container');
  window.location.hash = route;
  container.innerHTML = '';
  switch (route) {
    case '#/login':
      container.appendChild(components.login());
      // components.login.init();
      break;
    case '#/register':
      container.appendChild(components.register());
      // container.register.init();
      break;
    default:
      break;
  }
  console.log(route);
};

export default changeViews;
