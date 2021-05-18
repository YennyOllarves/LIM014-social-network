import { currentUser } from '../firebase-controllers/auth-controller.js';
import { imgToStorage } from '../firebase-controllers/storage-controller.js';
import { addPosts, getPosts } from '../firebase-controllers/fireStore-controller.js';
import publicationTopic from './post.js';


export default () => {
  const viewHomePage = document.createElement('section');
  const userIdentity = currentUser.uid;
  viewHomePage.classList.add('homePage-container');
  viewHomePage.innerHTML = `
    <!-- Left column -->
    <!-- Middle column -->
    <main class='home-column'>
        <!-- post -->
        <section class='the-post'>    
            <section class='the-user'>
            <img class='default-avatar'/>
           <p class='name'></p>
           </section>
            <section class='new-post'>
                <form id='postForm'>
                <textarea class='text-post' placeholder='¿Qué quieres compartir?' spellcheck='false' required></textarea>
                <i id='removeImg' style='display:none' class='remove-img'></i>
                <img id ='postPicture' class='post-picture' src=''/>
                <section class='publish-buttons'>
                    <label for='upload-picture'>
                        <input type='file' id='imgFile' accept='image/*' multiple class='img-file'>
                        <i class='picture-icon'>
                            <span class='icon-note'>elige una imagen</span>
                        </i>    
                    </label>
                    <button type='submit' id='sendPost' class='send-post'>
                    <i class='icon-post'>Compartir</i> 
                    </button>
                </section>
                </form>
            </section>   
        </section>
        <section id='postContainer'></section>
    </main>
    <section class='container-loading'>
        <section class='loading'>
            <progress value='0' max='100' id='loadingProcess'>0%</progress>
            <p id='loadingMsg'>0%</p>
        </section>
    </section>
    `;

  const postPicture = viewHomePage.querySelector('#postPicture');
  const removeImg = viewHomePage.querySelector('#removeImg');
  const imgFile = viewHomePage.querySelector('#imgFile');

  // imagen que se va a postear
  imgFile.addEventListener('change', (e) => {
    // se crea el objeto FileReader
    const fileReader = new FileReader();
    // se lee el archivo subido y se pasa a fileReader
    fileReader.readAsDataURL(e.target.files[0]);
    // en cuanto esté listo ejecute el código interno
    fileReader.onload = () => {
      postPicture.src = fileReader.result;
    };
    // se muestra el botón de remover la imagen
    removeImg.removeAttribute('style');
  });
  // remover imagen posteado
  removeImg.addEventListener('click', () => {
    postPicture.src = '';
    imgFile.value = '';
    removeImg.style.display = 'none';
  });
  // agregar post
  const postForm = viewHomePage.querySelector('#postForm');
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    postPicture.src = '';
    removeImg.style.display = 'none';
    // llamar a storage
    const imagenFile = e.target.closest('#postForm').querySelector('input').files[0];
    const loadingMsg = viewHomePage.querySelector('#loadingMsg');
    const containerLoading = viewHomePage.querySelector('.container-loading');
    const loadingProcess = viewHomePage.querySelector('#loadingProcess');
    const textPost = viewHomePage.querySelector('.text-post');
    if (imagenFile) {
      const postRoute = `imgPicture/${userIdentity}/${imagenFile.name}`;
      const sendImg = imgToStorage(postRoute, userIdentity);
      sendImg.on('ChangeOfState', (thePicture) => {
        // gestionar el proceso
        const process = (thePicture.bytesTransferred / thePicture.totalBytes) * 100;
        containerLoading.classList.add('modal');
        loadingMsg.textContent = 'Tu post está cargando';
        loadingProcess.value = process;
      }, () => {
        // gestionar cargas incorrectas
      }, () => {
        // gestionar cargas correctas al finalizar
        loadingProcess.thePicture.ref.getDownloadURL()
          .then((download) => {
            addPosts(userIdentity, textPost.value, download)
              .then(() => {
                containerLoading.classList.remove('modal');
                postForm.reset();
              });
          });
      });
    } else {
      addPosts(userIdentity, textPost.value, '')
        .then(() => {
          containerLoading.classList.remove('modal');
          postForm.reset();
        });
    }
  });

  // agregar post
  const containerPostAdd = viewHomePage.querySelector('#postContainer');
  getPosts((thePost) => {
    containerPostAdd.innerHTML = '';
    thePost.forEach((objPublication) => {
      containerPostAdd.appendChild(publicationTopic(objPublication));
    });
  });

  return viewHomePage;
};


          // linea 16
          //AGREGAR LOS SRC EN etiqueta img y p 
          //<section class='the-user'>
          //   <img class='default-avatar' src='${idUser.picture}'/>
          //  <p class='name'>${idUser.username}</p>
          //  </section>
