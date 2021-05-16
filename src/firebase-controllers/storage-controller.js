const imgToStorage = (route, imgFile) => firebase.storage().ref(route).put(imgFile);

export {
  imgToStorage,
};
