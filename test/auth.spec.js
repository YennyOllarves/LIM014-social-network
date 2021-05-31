import '../_mocks_/firebase-mock.js';
import {
  userRegister, loginEmail, loginGoogle, onAuthStateChanged, currentUser, logOut, checkMail,
} from '../src/firebase-controllers/auth-controller.js';

describe('userRegister', () => {
  it('Debería ser una función', () => {
    expect(typeof userRegister).toBe('function');
  });
  it('Debería crear un nuevo usuario registrado', () => userRegister('wenclive7@gmail.com', 'mypassword')
    .then((user) => {
      expect(user.email).toBe('wenclive7@gmail.com');
    }));
});

describe('loginEmail', () => {
  it('Debería ser una función', () => {
    expect(typeof userRegister).toBe('function');
  });
  it('Debería ingresar con email', () => loginEmail('wenclive7@gmail.com', 'mypassword')
    .then((user) => {
      expect(user.email).toBe('wenclive7@gmail.com');
    }));
});

describe('logingoogle', () => {
  it('Debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('Debería ingresar con google', () => {
    loginGoogle()
      .then((user) => {
        expect(user.strangePerson).toBe(false);
      });
  });
});

describe('onAuthStateChanged', () => {
  it('Debería ser una función', () => {
    expect(typeof onAuthStateChanged).toBe('function');
  });
  it('Debería cambiar el estado de autenticación', () => {
    onAuthStateChanged((user) => {
      if (user) {
        (user.uid).then((doc) => {
          expect(doc.data).toBe(true);
        });
      }
    });
  });
});

describe('currentUser', () => {
  it('Debería ser una función', () => {
    expect(typeof currentUser).toBe('function');
  });
  it('Debería reconocer al usuario actual', () => loginEmail('wenclive7@gmail.com', 'mypassword')
    .then(() => {
      expect(currentUser().email).toBe('wenclive7@gmail.com');
    }));
});

describe('logOut', () => {
  it('Debería ser una función', () => {
    expect(typeof logOut).toBe('function');
  });
  it('Debería cerrar sesión', () => {
    expect(logOut()).toBe(undefined);
  });
});

describe('checkmail', () => {
  it('Debería ser una función', () => {
    expect(typeof checkMail).toBe('function');
  });
  // it('Debería checkear el mail', () => {
  //   expect().toBe();
  // });
});
