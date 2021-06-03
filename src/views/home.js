// import { imgToStorage } from '../firebase-controllers/storage-controller.js';
import {
  deletePost, addPosts, getPosts, updateLike, getUserData, updatePost,
} from '../firebase-controllers/fireStore-controller.js';

export default (user) => {
  const viewHomePage = document.createElement('section');
  viewHomePage.classList.add('homePage-container');
  viewHomePage.innerHTML = `
  <section class='the-user profile'>
  </section>
    <main class='home-column'>
    <section class='the-user profile'>
        <img class='default-avatar border--avatar' src='${user.picture}'>
        <p class='name'>${user.username}</p>
    </section>
        <section class='the-post'>        
            <section class='new-post'>
              <div class="card card--">
                <div class="card-body">
                  <form id='postForm'>
                  <div class="form-group">
                  <textarea id='text-post' placeholder='¿Qué quieres compartir?' spellcheck='false' required ></textarea>
                  </div>
                    <div class="container">
                        <button id="buttonImage">Compartir</button>
                    </div>
                  </form>
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
    <div class="division">
    <div class="user-post">
    <section class= 'userContent'>
    <img id="pictureName" class="default-user border--user">
    <p id='thisName' class= 'namePost'></p>
    <div class="${(doc.userId !== doc.publication) ? 'hide' : 'show btn-menu-post'}">
    
    <i class="fas fa-ellipsis-v btn-menu-post"></i>
    <ul id="menu-post-content" class="menu-post-content">
      <li id="edit-post"><i class="fas fa-edit select editando"></i></li>
      <li id="delete-post"><i class="fas fa-trash-alt select"></i></li>
    </ul> 
    </div>
    </section>               
            <div class="card">
            <div class="content-post">
            <p class="text-post">${doc.publication}</p>
            <div class = "hide edit-text-post modal-window">
              <textarea  id= "editado" class="edit-text"></textarea>
              <div class = "edit-text-btns">
                <button type="button" data-id= ${doc.id} class="btn-guardar">Guardar</button>
                <button type="button" class="btn-cancelar">Cancelar</button>
              </div>
            </div>
            <div class= "hide button-delete window-delete">
              <p id="text-publication">¿Estás segura que quieres eliminar la publicación?</p>
                <button type="button" class="btn-yes">Si</button>
                <button type="button" class="btn-no">No</button>
            </div>
            <div class='bottom'>
            <p class="likes"${totalLikes === 0 ? 'hide' : 'counter-like'}" > ${totalLikes} ¡Me encanta!
              <span class = "tooltiptext"></i></span>
            </p>
            <p id = "count-comment" class="count-comment"></p>   
          
          <button type="button" id="corazon" ${doc.likes.length === -1 ? 'inactive-reaction' : 'active-reaction'}><i class="far fa-heart"></i></button>
          </div>
        </div>
      </div>
    </div>
    
    `;
    section.innerHTML = template;

    getUserData(doc.userId)
      .then((docito) => {
        // console.log(docito.data());
        const thisName = section.querySelector('#thisName');
        thisName.textContent = docito.data().username;
        const pictureName = section.querySelector('#pictureName');
        pictureName.src = docito.data().picture;
      });

    // MENU DE EDITAR Y ELIMINAR
    const btnMenu = section.querySelector('.btn-menu-post');
    btnMenu.addEventListener('click', () => {
      section.querySelector('#menu-post-content').classList.toggle('show');
    });
    // close menu click outside
    window.addEventListener('click', (e) => {
      if (e.target !== btnMenu) {
        section.querySelector('#menu-post-content').classList.remove('show');
      }
    });

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
      section.querySelector('.modal-window').style.display = 'none';
    });
    section.querySelector('.btn-guardar')
      .addEventListener('click', (e) => {
        const editado = section.querySelector('.edit-text');
        const idPost = e.target.dataset.id;
        updatePost(idPost, editado.value)
          .then(() => {
            editado.value = '';
          });
      });

    const modal = section.querySelector('#edit-post');
    modal.addEventListener('click', () => {
      section.querySelector('.modal-window').style.display = 'block';
    });

    // const buttonYes = section.querySelector('.btn-yes');
    const buttonNo = section.querySelector('.btn-no');

    // buttonYes.addEventListener('click', () => {
    //   document.getElementById('window-delete').style.display = 'none';
    // });

    buttonNo.addEventListener('click', () => {
      section.querySelector('.window-delete').style.display = 'none';
    });

    const botonEliminar = section.querySelector('#delete-post');
    botonEliminar.addEventListener('click', () => {
      section.querySelector('.window-delete').style.display = 'block';
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
  postPicture.addEventListener('click', (e) => {
    e.preventDefault();
    addPosts(user.uid, textarea.value, user.picture);
  });
  getPosts((data) => {
    const publicate = viewHomePage.querySelector('#postContainer');
    publicate.innerHTML = '';
    if (data.length) {
      // console.log(data);
      data.forEach((doc) => {
        const section = textName(doc);
        publicate.appendChild(section);
      });
    }
  });
  return viewHomePage;
};
