import components from '../components/index.js'

const changeViews = (route) => {
    
    const main = document.getElementById('main')


   switch (route){
       case'#/':
        main.appendChild(components.Home())
        components.Home.init();
       case '#/viewMenu':
           main.appendChild(components.viewMenu())
           components.viewMenu.init();
        


       default:
           break;
       }
    console.log(route);
}

export default changeViews;