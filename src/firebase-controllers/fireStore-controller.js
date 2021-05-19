/* firebase.firestore = Representa una base de datos de Cloud Firestore y
es el punto de entrada para todas las operaciones de Cloud Firestore. */

// Enviar información del usuario al cloud Firestore

const sendGeneralData = (user) => {
  const dataBase = firebase.firestore();
  let name;
  let photo;
  // let photoUrl;
  if (user.displayName != null && user.photoURL != null) {
    name = user.displayName;
    photo = user.photoURL;
  } else {
    name = 'viajera';
    // photoUrl = //photo.png
  }
  return dataBase.collection('usuarios').doc(user.uid).set({
    username: name,
    email: user.email,
    picture: photo,

  });
};

// Obtener información del usuario

const getUserData = (userIdentity) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('usuarios').doc(userIdentity).get();
};

// Actualización de información del usuario

const updateUserData = (userIdentity, name) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('usuarios').doc(userIdentity).update({
    username: name,
    email: user.email,
  });
};

// Base de Datos de Posts
const addPosts = (UserId, Privacy, Publication, URLimg) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('posts').add({
    userId: UserId,
    date: new Date().toLocaleString('es-ES'),
    privacy: Privacy,
    publication: Publication,
    urlimg: URLimg,
    likes: [],
  });
};

// Obtener todos los Posts onSnapsshot en vez de Get
const getPosts = (checkPosts) => {
  const dataBase = firebase.firestore();
  dataBase.collection('posts').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      checkPosts(posts);
    });
};

// Eliminar Posts
const deletePost = (idPost) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('posts').doc(idPost).delete();
};

// Actualizar Posts
const updatePost = (idPost, updatePublication) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('posts').doc(idPost).update({
    publication: updatePublication,
  });
};

// Base de Datos de Comentarios
const addComment = (UserId, idPost, Comment) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('posts').doc(idPost).collection('comentarios').add({
    userId: UserId,
    date: new Date().toLocaleString('es-ES'),
    comment: Comment,
  });
};

// Obtener todos los COmentarios onSnapsshot en vez de Get
const getComment = (idPost, checkComments) => {
  const dataBase = firebase.firestore();
  dataBase.collection(`posts/${idPost}/comentarios`).orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      checkComments(comments);
    });
};

// Eliminar COmentarios
const deleteComment = (idPost, idComment) => {
  const dataBase = firebase.firestore();
  return dataBase.collection(`posts/${idPost}/comentarios`).doc(idComment).delete();
};

// Actualizar Comentarios
const updateComment = (idPost, idComment, comment) => {
  const dataBase = firebase.firestore();
  return dataBase.collection(`posts/${idPost}/comentarios`).doc(idComment).update({ comment });
};

// Actualizar foto de perfil
const updateProfilePhoto = (userId, photo) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('usuarios').doc(userId).update({ photo });
};

// Actualizar foto de portada
const updateCoverPhoto = (userId, photoCover) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('usuarios').doc(userId).update({ photoCover });
};

// Actualizar Provacidad
const updatePrivacy = (id, privacy) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('posts').doc(id).update({ privacy });
};

// Actualizar Likes
const updateLike = (id, likes) => {
  const dataBase = firebase.firestore();
  return dataBase.collection('posts').doc(id).update({ likes });
};


export {
  sendGeneralData,
  getUserData,
  updateUserData,
  addPosts,
  getPosts,
  deletePost,
  updatePost,
  addComment,
  getComment,
  deleteComment,
  updateComment,
  updateProfilePhoto,
  updateCoverPhoto,
  updatePrivacy,
  updateLike,
};
