import { loginEmail, loginGoogle, currentUser } from '../firebase-controllers/auth-controller.js';
import { sendGeneralData, getUserData } from '../firebase-controllers/fireStore-controller.js';

// export default, name loginPage
export default () => {
  const viewLogin = document.createElement('section');
  viewLogin.classList.add('login-container');
  viewLogin.innerHTML = ` 
    <section class='login-page'>
      <section class='boxLogin-page'>
        <header>
        <img src='../img/foto1.jpg' class='header--img border--img'>
        <img src='../img/logo.svg' class='header-logo '>
          <h1 class='title-h1'> ¡Bienvenidas Viajeras! </h1>
        </header>
        <form class='boxForm--login' id='formLogin'>
          <section class='email-login'>
            <i class='email-icon'></i>
            <input type='email' id= 'email' class='form-one' placeholder='Correo electrónico' required autocomplete='off' spellcheck='false' />
          </section>
          <section class='email-login'>
            <i class='password-icon'></i>
            <input type='password' id='password' class='form-one' pattern='[a-zA-Z0-9]{6,20}' placeholder='Contraseña' required />
          </section>
          <button type='submit' id='' class='form-one btn-login'>Iniciar sesión</button>
          <p class='msg-error'></p>
          <p class='login-options'> También puedes ingresar con... </p>
          <section class='options-login'>
          
          <a hrf="" id='loginOptions' class="icon--login" > <img src="./img/google.svg" /> </a>
          <a hrf="" class="icon--login" > <img src="./img/facebook.svg" /> </a>
            <!-- imagen de google -->
          </section>
          <div class='end'>
          <p class='login--options'>¿No tienes una cuenta?</p>
          <p class='login-change'> Regístrate</p>
          </div>
        </form>
      </section>
    </section>
    `;

  // Ir a registrate
  const loginButton = viewLogin.querySelector('.login-change');
  loginButton.addEventListener('click', () => { window.location.hash = '#/register'; });

  // Manipulación del DOM para loguearse con GOOGLE

  const googleButton = viewLogin.querySelector('#loginOptions');
  googleButton.addEventListener('click', () => {
    loginGoogle()
      .then((result) => {
        // console.log(result.user);
        if (result.user.emailVerified) {
          // redirect
          window.location.hash = '#/home';
        } else {
          alert('Revisa tu conexión de internet');
        }
      }).catch(console.log);
});

  // Inicio de sesión con correo electrónico
  const loginEmailForm = viewLogin.querySelector('#formLogin');
  loginEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = viewLogin.querySelector('#email').value;
    const passwordInput = viewLogin.querySelector('#password').value;
    const msgError = viewLogin.querySelector('.msg-error');
    loginEmail(emailInput, passwordInput)
      .then((data) => {
        if (data.user.emailVerified) {
          getUserData(currentUser().uid)
            .then((doc) => {
              if (doc.exists) {
                window.location.hash = '#/home';
              } else {
                sendGeneralData(currentUser())
                  .then(() => {
                    window.location.hash = '#/home';
                  });
              }
            });
        } else {
          msgError.textContent = 'Cuenta no verificada, porfavor revise su bandeja de correo electrónico';
        }
      })
      .catch((err) => {
        msgError.textContent = err.message;
        setTimeout(() => {
          msgError.textContent = '';
        }, 5000);
      });
  });
  return viewLogin;
};
