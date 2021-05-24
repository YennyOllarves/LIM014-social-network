import {
  updatePost, deletePost, addComment, getUserData, updateLike,
} from '../firebase-controllers/fireStore-controller.js';
import { currentUser } from '../firebase-controllers/auth-controller.js';

// agregar getComment en la linea 2
// agregar utem comment.js de la carpeta comentario
export const publicationTopic = (objPublication) => {
  const idUser = firebase.auth().currentUser.uid;
  /* conteo de likes */
  const countLikes = objPublication.likes.length;
  const sectionPost = document.createElement('section');
  sectionPost.classList.add('thesePost');
  sectionPost.innerHTML = `
  <section class='principalPost'>
    <section class= 'userPost'>
    <section class = "${(idUser !== objPublication.idUser) ? 'hide' : 'show principal-post'}">  
    <i class="fas fa-ellipsis-v btnMenu-post"></i>
    <ul id= 'postContent' class= 'post-content'>
    <li id= 'postEdit'><i class="fas fa-edit select"></i>Editar</li>
    <li id= 'postDelete-${objPublication.id}'><i class="fas fa-trash select"></i>Delete</li>
    </ul>
    </section>
    <img class= 'postProfile' src= ''/>
    <p class= 'name'>
    <span class= 'userName'></span>
    <span class= 'zoomPhoto'>
      <img class= 'zoomImg' src= ''>
      <strong class= 'strongName'></strong> <br>
    </span>
    </p>
    <time class="time-post">${objPublication.date}</time>
      <section class= 'post-container' id='postContainer'>
        <p class= 'post-text'>${objPublication.publication}</p>
          <section class= 'hide post-edit'>
            <textarea class= 'text-edit'>${objPublication.publication}</textarea>
              <section class= 'btn-edit-text'>
              <button type= 'button' class= 'btn-save-text-${objPublication.id}'>Guardar</button>
              <button type= 'button' class= 'btn-cancel-text'>Cancelar</button>
              </section>
          </section>
          <img id='imgPost' class='img-post' src= '${objPublication.urlimg}'/>
          <section class= 'comment-container'>
          <p class= '${(countLikes === 0) ? 'hide' : 'count-loveIt'}'>${countLikes} ¡Me encanta!
          </p>
          <p id= 'commentCount' class= '${(countLikes === 0) ? 'comment-count' : 'comment-count-ok'}'></p>
          <hr>
          <button type= 'button' id= 'btnLove' class= 'btn-love' ${(objPublication.likes.indexOf(idUser) === -1) ? 'inactive' : 'active'}><i class="far fa-heart"></i></button>
          <button type= 'button' id= 'commentButton' class= 'comment-button'><i class="far fa-comment"></i></button>
          </section>
            <section id= 'commentBox' class= 'hide'>
            <form class= 'comments comment-form'>
            <textarea class= 'theComment' placeholder= 'Agregar comentario' required></textarea>
            <button type= 'submit' class="far fa-paper-plane"></button>
            </form>
              <section id= 'allCommentBox'></section>
            </section>
      </section>
  </section>
  `;
  // traer información del usuario para su post
  getUserData(objPublication.idUser)
    .then((doc) => {
      const postProfile = sectionPost.querySelector('.postProfile');
      const userName = sectionPost.querySelector('.username');
      const strongName = sectionPost.querySelector('.strongName');
      const zoomImg = sectionPost.querySelector('.zoomImg');

      postProfile.src = doc.data().picture;
      userName.textContent = doc.data().userName;
      strongName.textContent = doc.data().userName.toUpperCase();
      zoomImg.src = doc.data().picture;
    });
};
