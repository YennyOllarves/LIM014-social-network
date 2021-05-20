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
        <img src='../img/foto1.jpg' class='header--img border--img'>
        <img src='../img/logoRegister.svg' class='header--logo '>
          <h1 class='title-h1'>¡Regístrate!</h1>
        </header>
        <form class='boxLogin-page' id='boxForm-Register'>
        <section class='input-initial' >
        <i class='user-icon'></i>
        <input type='text' class='form-one' id='theName' placeholder='Nombres y Apellidos' required autocomplete='off' spellcheck='false'/>
        </section>
      <section class='input-initial'>
        <i class='email-icon'></i>
        <input type='email' id='email' class='form-one' placeholder='Correo electrónico' required autocomplete='off' spellcheck='false' />
      </section>
      <section class='input-initial'>
        <i class='password-icon'></i>
        <input type='password' id='password' class='form-one' pattern='[a-zA-Z0-9]{6,20}' placeholder='Crea una contraseña' required />
      </section>
      <section class="boxLogin-page" >
      <input type="checkbox" />
      <label class="boxLogin-page" for="termConditions">Acepto los <a  href="./docs/terms-and-conditions.pdf" target="_blank" class="boxLogin-page">Términos, Condiciones y Política de Privacidad.</a></label>
    </section>
    <button type='submit' class='form-one btn-login'>Continuar</button>
    <p class='msg-error'></p>
    <p class='login-options'> o bien regístrate con... </p>
    <section class='options-login'>
        
        <a hrf="" id='loginOptionsRegister' class="icon-login" > <img src="./img/google.svg" /> </a>
        <a hrf="" class="icon-login" > <img src="./img/facebook.svg" /> </a>
          <!-- imagen de google -->
        </section>
        <div class='end'>
        <p class='login-text'>¿Ya tienes una cuenta?</p>
        <p class='login-change'>Inicia Sesión</p>
        </div>
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
    loginGoogle();
    // .then(() => {
    //   getUserData(currentUser().userId)
    //     .then((doc) => {
    //       if (doc.exists) {
    //         window.location.hash = '#/home';
    //       } else { // consulta de promesa
    //         sendGeneralData(currentUser())
    //           .then(() => {
    //             window.location.hash = '#/home';
    //           });
    //       }
    //     });
    // });
  });
  // creación de usuarios
  const userSingUp = viewRegister.querySelector('#boxForm-Register');
  userSingUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = viewRegister.querySelector('#theName').value;
    const emailInput = viewRegister.querySelector('#email').value;
    const passwordInput = viewRegister.querySelector('#password').value;
    const msgError = viewRegister.querySelector('.msg-error');

    userRegister(emailInput, passwordInput)
    // revisar el auth para agregar en el registro

      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: usernameInput,
        });
        sendGeneralData(emailInput, usernameInput, user.uid);
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

  // var user = firebase.auth().currentUser;

  return viewRegister;
};
