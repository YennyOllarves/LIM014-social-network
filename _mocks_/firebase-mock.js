const firebaseMock = require('firebase-mock');

const authMock = new firebaseMock.MockAuthentication();
authMock.autoFlush();
global.firebase = firebaseMock.MockFirebaseSdk(
  () => null,
  () => authMock,
);
