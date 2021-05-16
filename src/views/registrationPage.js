import {
  userRegister, checkMail, loginGoogle, currentUser,
} from '../firebase-controllers/auth-controller.js';
import { sendGeneralData, getUserData } from '../firebase-controllers/fireStore-controller.js';

// export default, name registrationPage
export default () => {
  const viewRegister = document.createElement('section');
  viewRegister.classList.add('login-container');
  viewRegister.innerHTML = ` 
    <section class='login-page'>
      <section class='boxLogin-page'>
        <header>
          <h1 class='login-page'> Traveling Soul</h1>
          <h2 class>¡Regístrate!</h2>
        </header>
        <form class='boxForm-Register'>
          <section class='input-initial'>
            <i class='user-icon'></i>
            <input type='text' class='user' placeholder='Nombres y Apellidos' autocomplete='off' spellcheck='false' 
          </section>
          <section class='input-initial'>
            <i class='email-icon'></i>
            <input type='email' class='email' placeholder='Correo electrónico' autocomplete='off' spellcheck='false' />
          </section>
          <section class='input-initial'>
            <i class='password-icon'></i>
            <input type='password' class='password' pattern='[a-zA-Z0-9]{6,20}' placeholder='Crea una contraseña' />
          </section>
          <section class="terms">
            <input type="checkbox" class='terms-conditions' />
            <label for="termConditions">Acepto los <a href="./docs/terms-and-conditions.pdf" target="_blank">Términos, Condiciones y Política de Privacidad.</a></label>
          </section>
          <button type='submit' class='btn-login'>Continuar</button>
          <p class='msg-error'></p>
          <p class='login-options'> o bien regístrate con... </p>
          <section class='options-login'>
          <button id='loginOptionsRegister'>Google</button>
            <!-- imagen de google -->
          </section>
          <p class='login-options'>¿Ya tienes una cuenta?</p>
          <p class='login-change'>Inicia Sesión</p>
        </form>
      </section>
    </section>
  `;
  // regresa a iniciar sesión
  const backLogin = viewRegister.querySelector('.login-change');
  backLogin.addEventListener('click', () => { window.location.hash = '#/login'; });

  // Manipulación del DOM para loguearse con GOOGLE

  const googleButton = viewRegister.querySelector('#loginOptionsRegister');
  googleButton.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        getUserData(currentUser().uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/home';
            } else { // consulta de promesa
              sendGeneralData(currentUser())
                .then(() => {
                  window.location.hash = '#/home';
                });
            }
          });
      });
  });
  // creación de usuarios
  const userSingUp = viewRegister.querySelector('.boxForm-Register');
  userSingUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = viewRegister.querySelector('.email').value;
    const passwordInput = viewRegister.querySelector('.password').value;
    const msgError = viewRegister.querySelector('.msg-error');
    userRegister(emailInput, passwordInput) // revisar el auth para agregar en el registro
      .then(() => {
        checkMail()
          .then(() => {
            msgError.classList.add('successful-message');
            msgError.textContent = 'Please check your inbox to verify your account';
          })
          .catch((err) => {
            msgError.classList.add('error-message');
            msgError.textContent = err.message;
          });
        userSingUp.reset();
      })
      .catch((err) => {
        msgError.classList.remove('successful-message');
        msgError.classList.add('error-message');
        msgError.textContent = err.message;
        setTimeout(() => {
          msgError.textContent = '';
        }, 4000);
      });
  });

  return viewRegister;
};
