// import { imgToStorage } from '../firebase-controllers/storage-controller.js';
import {
  deletePost, addPosts, getPosts, updateLike, getUserData, updatePost,
} from '../firebase-controllers/fireStore-controller.js';

export default (user) => {
  const viewHomePage = document.createElement('section');
  viewHomePage.classList.add('homePage-container');
  viewHomePage.innerHTML = `
    <!-- Middle column -->
    <main class='home-column'>
        <!-- post -->
        <section class='the-post'>    
            <section class='the-user'>
            <img class='default-avatar' src='${user.picture}'>
           <p class='name'>${user.username}</p>
           </section>
            <section class='new-post'>
              <div class="card">
                <div class="card-body">
                  <form id='postForm'>
                  <div class="form-group">
                  <textarea id='text-post' placeholder='¿Qué quieres compartir?' spellcheck='false' required ></textarea>
                  </div>
                  <i id='removeImg' style='display:none' class='remove-img'></i>
                    <div class="container">
                        <button id="buttonImage">Compartir</button>
                    </div>
                  </form>
                  <section>
                  <button id="editar">Guardar</button>
                  <button id="cancelar">Cancelar</button>
                  </section>
                </div>
              </div>
            </section>   
        </section>
        <section id='postContainer'></section>
    </main>
    `;

  const textName = (doc) => {
    const totalLikes = doc.likes.length;
    const section = document.createElement('section');
    const template = `
    <div class="column">
        <div class="card">
          <section class= 'userContent'>
            <img id="pictureName" class="default-user">
            <p id='thisName'></p>
          </section>
        <p id="text-publication">${doc.publication}</p>
            <i class="btn-menuPost"></i>
            <ul id="menu-post-content" class="menu-post-content">
              <li href="" id="edit-post"><i class="fas fa-edit select"></i>Editar</li>
              <li id="delete-post"><i class="fas fa-trash-alt select"></i>Eliminar</li>
            </ul>
            <div class="content-post">
            <p class="text-post">${doc.publication}</p>
            <div class = "hide edit-text-post" id="modal-window">
              <textarea  id= "editado" class="edit-text"></textarea>
              <div class = "edit-text-btns">
                <button type="button" class="btn-guardar">Guardar</button>
                <button type="button" class="btn-cancelar">Cancelar</button>
              </div>
            </div>
            <div id= "window-delete" class= "hide button-delete">
              <p id="text-publication">¿Estás segura que quieres eliminar la publicación?</p>
                <button type="button" class="btn-yes">Si</button>
                <button type="button" class="btn-no">No</button>
            </div>
            <p class=""${totalLikes === 0 ? 'hide' : 'counter-like'}" > ${totalLikes} ¡Me encanta!
              <span class = "tooltiptext"><i class="far fa-heart"></i></span>
            </p>
            <p id = "count-comment" class="count-comment"></p>   
            <hr>
          <button type="button" id="corazon" ${doc.likes.length === -1 ? 'inactive-reaction' : 'active-reaction'}><i class="far fa-heart"></i>Like</button>
        </div>
    </div>`;
    section.innerHTML = template;
    const likes = section.querySelector('#corazon');
    getUserData(doc.userId)
      .then((docito) => {
        const thisName = section.querySelector('#thisName');
        thisName.textContent = docito.data().username;
        const pictureName = section.querySelector('#pictureName');
        pictureName.src = docito.data().picture;
      });
    likes.addEventListener('click', (e) => {
      e.preventDefault();
      const result = doc.likes.indexOf(user.userId);
      if (result === -1) {
        doc.likes.push(user.userId);
        updateLike(doc.id, doc.likes);
      } else {
        doc.likes.splice(result, 1);
        updateLike(doc.id, doc.likes);
      }
    });
    // section.querySelector('#edit-post')
    //   .addEventListener('click', () => {
    // li del menu boton
    const editPost = section.querySelector('#edit-post');
    // const publication = section.querySelector('#text-publication');
    // const buttonSave = section.querySelector('.btn-guardar');
    const buttonDelete = section.querySelector('.btn-cancelar');

    editPost.addEventListener('click', () => {
      section.querySelector('.edit-text-post').classList.remove('hide');
      section.querySelector('.text-post').classList.add('hide');
    });
    buttonDelete.addEventListener('click', () => {
      document.getElementById('modal-window').style.display = 'none';
    });
    section.querySelector('.btn-guardar')
      .addEventListener('click', () => {
        const editado = section.querySelector('#editado');
        // console.log(editado.value, doc.id)
        updatePost(doc.id, editado.value)
          .then(() => {
            editado.value = '';
          });
      });

    const modal = section.querySelector('#edit-post');
    modal.addEventListener('click', () => {
      document.getElementById('modal-window').style.display = 'block';
    });

    // const buttonYes = section.querySelector('.btn-yes');
    const buttonNo = section.querySelector('.btn-no');

    // buttonYes.addEventListener('click', () => {
    //   document.getElementById('window-delete').style.display = 'none';
    // });

    buttonNo.addEventListener('click', () => {
      document.getElementById('window-delete').style.display = 'none';
    });

    const botonEliminar = section.querySelector('#delete-post');
    botonEliminar.addEventListener('click', () => {
      document.getElementById('window-delete').style.display = 'block';
      // deletePost(doc.id);
    });

    const botonYes = section.querySelector('.btn-yes');
    botonYes.addEventListener('click', () => {
      deletePost(doc.id);
    });

    // buttonSave.addEventListener('click', () => {
    //   updatePost(doc.id, publication.value);
    // });

    return section;
  };

  document.getElementById('header').classList.remove('hide');

  const postPicture = viewHomePage.querySelector('#buttonImage');
  const textarea = viewHomePage.querySelector('#text-post');
  postPicture.addEventListener('click', () => {
    addPosts(user.uid, textarea.value, user.picture);
  });
  getPosts((data) => {
    const publicate = viewHomePage.querySelector('#postContainer');
    publicate.innerHTML = '';
    if (data.length) {
      data.forEach((doc) => {
        const section = textName(doc);
        publicate.appendChild(section);
      });
    }
  });
  return viewHomePage;
};
