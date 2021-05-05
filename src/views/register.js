const Register = () => {
    const viewRegister = ` 
      <section class="container-home">
        <h1 class="container-home">TRAVEILNGSOUL</h1>
        <h3 class="container-home">AQUI VA MI FORM DE REGISTRO</h3>
        
      </section>
     `;

     const divElement = document.createElement('div')
     divElement.innerHTML = viewRegister;
     return divElement;
     
}

export default Register;