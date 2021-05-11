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

  // Inicio de sesión
  const loginButton = viewLogin.querySelector('.login-change');
  loginButton.addEventListener('click', () => { window.location.hash = '#/register'; });

  // Manipulación del DOM para loguearse con GOOGLE

  const googleButton = viewLogin.querySelector('.login-options');
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
  // Inicio de sesión con correo electrónico
  const loginEmailForm = viewLogin.querySelector('.boxForm-login');
  loginEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = viewLogin.querySelector('.email').value;
    const passwordInput = viewLogin.querySelector('.password').value;
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
