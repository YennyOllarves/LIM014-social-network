const Header = () => {
    const viewHeader = ` 
      <section class="container-header">
        <h1 class="container-home">TRAVEILNGSOUL ---- header </h1>
        <h3 class="container-home">AQUI VA TODO MI CONTENIDO</h3>
       
   
      </section>
     `;

     const divElement = document.createElement('div')
     divElement.innerHTML = viewHeader;
     return divElement;
     
}

export default Header;