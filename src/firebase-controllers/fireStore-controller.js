/* firebase.firestore = Representa una base de datos de Cloud Firestore y
es el punto de entrada para todas las operaciones de Cloud Firestore. */

// Enviar información del usuario al cloud Firestore

const sendGeneralData = (user) => {
  const dataBase = firebase.firestore();
  let name;
  let photoUrl;
  if (user.displayName != null && user.photoURL != null) {
    name = user.displayName;
    photoUrl = user.photoURL;
  } else {
    name = 'viajera';
    photoUrl = //photo.png
  }
  return dataBase.collection('usuarios').doc(user.uid).set({
    username: name,
    email: user.email,
    photo: photoUrl,
    photoCover: //'img/default-cover.jpg',
    birthday: 'yyyy-MM-dd',
    country: 'Country',
    description: 'Description',
  })
};


// Obtener información del usuario

const getUserData = (userIdentity) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('usuarios').doc(userIdentity).get();
};

// Actualización de información del usuario

const updateUserData = (userIdentity, name, Birthday, Country, Description) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('usuarios').doc(userIdentity).update({
    username: name,
    email: user.email,
    birthday: Birthday,
    country: Country,
    description: Description,
  });
};

export { 
  sendGeneralData, 
  getUserData,
  updateUserData
}
