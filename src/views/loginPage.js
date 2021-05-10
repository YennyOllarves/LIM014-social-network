// import controles
import {loginEmail, loginGoogle, currentUser } from '../firebase-controllers/auth-controller';
import {sedGeneralData, getUserData} from '../firebase-controllers/fireStore-controller';
 


//export default, name loginPage
export default () => {
  const viewLogin = document.createElement('section');
  viewLogin.classList.add('login-container');
  viewLogin.innerHTML = ` 
    <section class='login-page'>
      <section class='boxLogin-page'>
        <header>
          <h1 class='login-page'> Traveling Soul</h1>
          <h2 class>Bienvenidas viajeras</h2>
        </header>
        <form class='boxForm-login'>
          <section class='email-login'>
            <i class='email-icon'></i>
            <input type='email' class='email' placeholder='Correo electrónico' required autocomplete='off' spellcheck='false' />
          </section>
          <section class='email-login'>
            <i class='password-icon'></i>
            <input type='password' class='password' pattern='[a-zA-Z0-9]{6,20}' placeholder='Contraseña' required />
          </section>
          <button type='submit' class='btn-login'>Iniciar sesión</button>
          <p class='msg-error'></p>
          <p class='login-options'> o bien ingresa con... </p>
          <section class='options-login'>
            <!-- imagen de google -->
          </section>
          <p class='login-options'>¿No tienes una cuenta?</p>
          <p class='login-change'> Regístrate</p>
        </form>
      </section>
    </section>
    `;
  

};
