import {
  userRegister, checkMail, loginGoogle,
} from '../firebase-controllers/auth-controller.js';
import { sendGeneralData } from '../firebase-controllers/fireStore-controller.js';

// export default, name registrationPage
export default () => {
  const viewRegister = document.createElement('section');
  viewRegister.classList.add('login-container');
  viewRegister.innerHTML = ` 


  <div class="header">
  
  <!--Content before waves-->
  <div class="inner-header flex">
  <h1 class= 'titulos'>¡Bienvenidas a Traveling Soul!</h1>
  </div>
  
  <!--Waves Container-->
  <div>
  <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
  <defs>
  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
  </defs>
  <g class="parallax">
  <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
  <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
  <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
  <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
  </g>
  </svg>
  </div>
  <!--Waves end-->
  
  </div>

    <section class='login-pages'>
    <header class= 'newRegister'>
        <img src='../img/foto1.jpg' class='header--register border--img'>
        <img src='../img/logoRegister.svg' class='header--register--logo '>
          <h1 class='title-h1'>¡Regístrate!</h1>
        </header>
      <section class='boxRegister-page'>
        
        <form class='boxRegister-page' id='boxForm-Register'>
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
      <section class="boxRegister-page" >
      <input type="checkbox" />
      <label class="boxRegister-page" for="termConditions">Acepto los <a  href="./docs/terms-and-conditions.pdf" target="_blank" class="boxRegister-page">Términos, Condiciones <br>y Política de Privacidad.</a></label>
    </section>
    <button type='submit' class='form-one btn-login'>Continuar</button>
    <p class='msg-error'></p>
    <p class='login-options'> o bien regístrate con... </p>
    <section class='options-login'>
        
        <a hrf="" id='loginOptionsRegister' class="icon-logins" > <img src="./img/google.svg" /> </a>
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
    loginGoogle()
      .then((result) => {
        if (result.user.emailVerified) {
          // redirect
          window.location.hash = '#/home';
        } else {
          alert('verifica tu email');
        }
      }).then(() => {
        const googleate = firebase.auth().currentUser;
        // const userDisplayName = googleate.displayName;
        sendGeneralData(googleate.email, googleate.displayName, googleate.uid, googleate.photoURL);
        // sendGeneralData(currentUser().displayName);
      })
  });
  // creación de usuarios
  const userSingUp = viewRegister.querySelector('#boxForm-Register');
  userSingUp.addEventListener('submit', (e) => {
    e.preventDefault();
    // const usernameInput = viewRegister.querySelector('#theName').value;
    const emailInput = viewRegister.querySelector('#email').value;
    const passwordInput = viewRegister.querySelector('#password').value;
    const msgError = viewRegister.querySelector('.msg-error');

    userRegister(emailInput, passwordInput)
    // revisar el auth para agregar en el registro

      .then(() => {
        const user = firebase.auth().currentUser;
        // Actualizar datos del perfil
        // user.updateProfile({
        //   displayName: usernameInput,
        // });
        sendGeneralData(emailInput, user.uid);
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
