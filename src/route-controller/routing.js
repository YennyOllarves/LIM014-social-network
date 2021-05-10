import components from '../components/index.js'

const changeViews = (route) => {
    
    const main = document.getElementById('main')
    const header = document.getElementById('header')


   switch (route){
       case'#/':
        main.appendChild(components.Home())
        components.Home.init();
       case '#/Header':
           main.appendChild(components.Header())
           components.Header.init();
       default:
           break;
       }
    console.log(route);
}

export default changeViews;