// import controles

// export default, name registrationPge
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
            <input type='text' class='user' placeholder='Nombres y Apellidos' required autocomplete='off' spellcheck='false' />
          </section>
          <section class='input-initial'>
            <i class='email-icon'></i>
            <input type='email' class='email' placeholder='Correo electrónico' required autocomplete='off' spellcheck='false' />
          </section>
          <section class='input-initial'>
            <i class='password-icon'></i>
            <input type='password' class='password' pattern='[a-zA-Z0-9]{6,20}' placeholder='Crea una contraseña' required />
          </section>
          <section class="terms">
            <input type="checkbox" class='terms-conditions' />
            <label for="termConditions">Acepto los <a href="./docs/terms-and-conditions.pdf" target="_blank">Términos, Condiciones y Política de Privacidad.</a></label>
          </section>
          <button type='submit' class='btn-login'>Continuar</button>
          <p class='msg-error'></p>
          <p class='login-options'> o bien regístrate con... </p>
          <section class='options-login'>
            <!-- imagen de google -->
          </section>
          <p class='login-options'>¿Ya tienes una cuenta?</p>
          <p class='login-change'>Inicia Sesión</p>
        </form>
      </section>
    </section>
    `;
};
