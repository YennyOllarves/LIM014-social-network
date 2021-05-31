const firebaseMock = require('firebase-mock');

const authMock = new firebaseMock.MockAuthentication();
const firestoreMock = new firebaseMock.MockFirestore();
authMock.autoFlush();
global.firebase = firebaseMock.MockFirebaseSdk(
  () => null,
  () => authMock,
  () => firestoreMock,
);
