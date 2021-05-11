const sendImgProfile = (route, imgFile) => firebase.storage().ref(route).put(imgFile);

// const sendImgCover = ( route, imgFile) => firebase.storage().ref(route).put(imgFile);

// const sendPostCover = ( route, imgFile) => firebase.storage().ref(route).put(imgFile);

export {
  sendImgProfile,
  // sendPostCover,
  // sendPostCover
};
