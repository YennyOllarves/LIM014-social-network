// import { viewHomePage } from '../views/home.js';
// import { publicationTopic } from '../views/post.js';

// const upload() => {
//   // get your image
//   const image = viewHomePage.querySelector('#postPicture').files[0];
//   // get your blog text
//   const post = viewHomePage.querySelector('#textPost').value;
//   // get image name
//   const imageName = image.name;
//   // firebase storage reference
//   // it is the path where your image will be stored
//   const storageRef = firebase.storage().ref(`images/${imageName}`);
//   // upload image to selected storage reference
//   // make sure you pass image here
//   const uploadTask = storageRef.put(image);
//   // to get the state of image uploading....
//   uploadTask.on('state_changed', (snapshot) => {
//     // get task progress by following code
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log(`upload is ${progress} done`);
//   }, (error) => {
//     // handle error here
//     console.log(error.message);
//   }, () => {
//     // handle successfull upload here..
//     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//       // get your image download url here and upload it to databse
//       // our path where data is stored ...push is used so that every post have unique id
//       firebase.database().ref('posts/').push().set({
//         text: post,
//         imageURL: downloadURL,
//       }, (error) => {
//         if (error) {
//           alert('Error while uploading');
//         } else {
//           alert('Successfully uploaded');
//           // now reset your form
//           document.getElementById('post-form').reset();
//           getdata();
//         }
//       });
//     });
//   });
// }
// window.onload = function () {
//   this.getdata();
// };

// function getdata() {
//   firebase.database().ref('posts/').once('value').then((snapshot) => {
//     // get your posts div
//     const posts_div = publicationTopic.querySelector('#postContainer');
//     // remove all remaining data in that div
//     posts.innerHTML = '';
//     // get data from firebase
//     const data = snapshot.val();
//     console.log(data);
//     // now pass this data to our posts div
//     // we have to pass our data to for loop to get one by one
//     // we are passing the key of that post to delete it from database
    
//   });
// }

// function delete_post(key) {
//   firebase.database().ref(`posts/${key}`).remove();
//   getdata();
// }
