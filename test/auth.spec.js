import '../mocks/firebase-mock.js';

import {
  userRegister,
} from '../src/firebase-controllers/auth-controller.js';
// import { imgToStorage } from '../src/firebase-controllers/storage-controller.js';

describe('userRegister', () => {
  it('Debería ser una función', () => {
    expect(typeof userRegister).toBe('function');
  });
  it('Debería crear un nuevo usuario registrado', (register) => {
    userRegister('benito@gmail.com', 'mypassword').then((theUser) => {
      expect(theUser.email).toBe('benito@gmail.com');
      expect(theUser.otherPerson).toBe(false);
      register();
    });
  });
});
