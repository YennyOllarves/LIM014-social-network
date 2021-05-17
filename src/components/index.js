import viewLogin from '../views/loginPage.js';
import viewRegister from '../views/registrationPage.js';
import viewMenu from '../views/header.js';
import viewHomePage from '../views/home.js';
import viewPost from '../views/post.js';

const components = {
  login: viewLogin,
  register: viewRegister,
  menuHeader: viewMenu,
  home: viewHomePage,
  post: viewPost,
};

export default components;
