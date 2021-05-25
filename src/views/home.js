import { imgToStorage } from '../firebase-controllers/storage-controller.js';
import { deletePost, addPosts, getPosts, updateLike } from '../firebase-controllers/fireStore-controller.js';

export default (user) => {
  console.log(user);
  const viewHomePage = document.createElement('section');
  // const userIdentity = user.uid;
  // const totalLikes = user.likes;
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
            <img class='default-user' src='${user.picture}'>
            <p class='thisName'>${user.username}</p>
          </section>
        <p id="text-publication">${doc.publication}</p>
            <img src="" id="image">
            <button id="borrar">Delete</button>
            <p class=""${totalLikes === 0 ? 'hide' : 'counter-like'}" > ${totalLikes} reactions" 
              <span class = "tooltiptext"><i class="far fa-heart"></i> ${user.userId.likes} </span>
            </p>
            <p id = "count-comment" class="count-comment"></p>   
            <hr>
          <button type="button" id="corazon" ${doc.likes.length === -1 ? 'inactive-reaction' : 'active-reaction'}"><i class="far fa-heart"></i>Like</button>
        </div>
    </div>`;
    section.innerHTML = template;
    // getUserData(doc.uid)
    //   .then((docito) => {
    //     console.log(docito);
    //     const thisName = section.querySelector('#thisName');
    //     thisName.textContent = docito.data().username;
    //   });

    const likes = section.querySelector('#corazon');
    likes.addEventListener('click', () => {
      const result = doc.likes.indexOf(user.userId);
      if (result === -1) {
        doc.likes.push(user.userId);
        updateLike(doc.id, doc.likes);
      } else {
        doc.likes.splice(result, 1);
        updateLike(doc.id, doc.likes);
      }
    });
    section.innerHTML = template;
    section.querySelector('#borrar')
      .addEventListener('click', () => {
        deletePost(doc.id);
      });
    return section;
  };

  document.getElementById('header').classList.remove('hide');

  // const textoPublic = viewHomePage.querySelector('#text-post');
  // textoPublic.addEventListener('click' (e) {
  //   const
  // })

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
  //IMAGEN

  // postPicture.addEventListener('click', () => {
  //   const ref = firebase.storage().ref();
  //   const file = document.querySelector('#photo').files[0];
  //   const name = `${new Date()}-${file.name}`;
  //   if (file === null) {
  //     // alert('Debe seleccionar una imagen');
  //   } else {
  //     const metadata = {
  //       contentType: file.type,
  //     };
  //     const task = ref.child(name).put(file, metadata); // cuando la imagen suba de manera correcta,
  //     task
  //       .then((snapshot) => snapshot.ref.getDownloadURL()) // va a descargar la imagen,
  //       .then((url) => { // obtenemos la url de la imagen
  //         // console.log(url);
  //         // alert('Image upload')
  //         const imageElement = document.querySelector('#image'); //  asignar directamente a la etiqueta image
  //         imageElement.src = url; // al imageElement queremos entrar a la propiedad src
  //       });
  //   }
  //   console.log(ref);
  // });

  // POSTS
  // const postArea = viewHomePage.querySelector('#text-post');
  // postArea.addEventListener('click', (e) => {

  // })

  // // MY POSTS SECTION
  // myPosts.addEventListener('click', (e) => {
  //   e.stopPropagation();
  //   Array.from(divElement.querySelectorAll('.divPost'))
  //     .forEach((div) => {
  //       // eslint-disable-next-line no-param-reassign
  //       div.style.display = 'none';
  //     });
  //   myownPosts(showPosts, postArea, user.uid);
  // });

  // const postPicture = viewHomePage.querySelector('#postPicture');
  // const removeImg = viewHomePage.querySelector('#removeImg');
  // const imgFile = viewHomePage.querySelector('#imgFile');

  // // imagen que se va a postear
  // imgFile.addEventListener('change', (e) => {
  //   // se crea el objeto FileReader
  //   const fileReader = new FileReader();
  //   // se lee el archivo subido y se pasa a fileReader
  //   fileReader.readAsDataURL(e.target.files[0]);
  //   // en cuanto esté listo ejecute el código interno
  //   fileReader.onload = () => {
  //     postPicture.src = fileReader.result;
  //   };
  //   // se muestra el botón de remover la imagen
  //   removeImg.removeAttribute('style');
  // });
  // // remover imagen posteado
  // removeImg.addEventListener('click', () => {
  //   postPicture.src = '';
  //   imgFile.value = '';
  //   removeImg.style.display = 'none';
  // });
  // // agregar post
  // const postForm = viewHomePage.querySelector('#postForm');
  // postForm.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   postPicture.src = '';
  //   removeImg.style.display = 'none';
  //   // llamar a storage
  //   const imagenFile = e.target.closest('#postForm').querySelector('input').files[0];
  //   const loadingMsg = viewHomePage.querySelector('#loadingMsg');
  //   const containerLoading = viewHomePage.querySelector('.container-loading');
  //   const loadingProcess = viewHomePage.querySelector('#loadingProcess');
  //   const textPost = viewHomePage.querySelector('.text-post');
  //   if (imagenFile) {
  //     const postRoute = `imgPicture/${userIdentity}/${imagenFile.name}`;
  //     const sendImg = imgToStorage(postRoute, imagenFile);
  //     sendImg.on('ChangeOfState', (thePicture) => {
  //       // gestionar el proceso
  //       const process = (thePicture.bytesTransferred / thePicture.totalBytes) * 100;
  //       containerLoading.classList.add('modal');
  //       loadingMsg.textContent = 'Tu post está cargando';
  //       loadingProcess.value = process;
  //     }, () => {
  //       // gestionar cargas incorrectas
  //     }, () => {
  //       // gestionar cargas correctas al finalizar
  //       loadingProcess.thePicture.ref.getDownloadURL()
  //         .then((download) => {
  //           addPosts(userIdentity, textPost.value, download)
  //             .then(() => {
  //               containerLoading.classList.remove('modal');
  //               postForm.reset();
  //             });
  //         });
  //     });
  //   } else {
  //     addPosts(userIdentity, textPost.value, '')
  //       .then(() => {
  //         containerLoading.classList.remove('modal');
  //         postForm.reset();
  //       });
  //   }
  // });

  return viewHomePage;
};
