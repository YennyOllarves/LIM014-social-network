import MockFirebase from 'mock-cloud-firestore';
import {
  sendGeneralData, addPosts, getPosts, getUserData, deletePost, updatePost, updateLike,
} from '../src/firebase-controllers/fireStore-controller.js';

const fixtureData = {
  _collection_: {
    usuarios: {
      _doc_: {
        userId_001: {
          username: 'Jake gyllenhaal',
          email: 'sulclive7@gmail.com',
        },
      },
    },

    posts: {
      _doc_: {
        id_001: {
          userId: '001',
          urlimg: '',
          date: '',
          publication: '¡Buen día comunidad!',
          likes: '',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('sendGeneralData', () => {
  it('Debería crear un nuevo usuario', () => {
    const currentUser = {
      userId: 'uid_002',
      username: 'Jake',
      email: 'sulclive7@gmail.com',
      picture: 'picture.jpg',
    };
    const current = {
      userId: 'uid_003',
      username: null,
      email: 'sulclive7@gmail.com',
      picture: null,
    };
    sendGeneralData(currentUser).then(() => {
      getUserData('uid_002')
        .then((doc) => {
          expect(doc().userId.set.email).toEqual('sulclive7@gmail.com');
          expect(doc().userId.set.username).toEqual('Jake');
        });
    });
    sendGeneralData(current)
      .then(() => {
        getUserData('uid_003')
          .then((doc) => {
            expect(doc().userId.set.username).toEqual('user');
          });
      });
  });
});

describe('addPosts', () => {
  it('Debería ser una función', () => {
    expect(typeof addPosts).toBe('function');
  });
  it('Debería agregar una publicación', (done) => addPosts('userId_002', 'my post', '')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.publication === 'my post');
        expect(result.publication).toBe('my post');
        done();
      },
    )));
});

describe('updatePost', () => {
  it('Debería ser una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  it('Debería editar un post', (done) => updatePost('id_001', 'post editado')
    .then(() => getPosts((data) => {
      const result = data.find((posts) => posts.publication === 'post editado');
      expect(result.publication).toBe('post editado');
      done();
    })));
});

describe('deletePost', () => {
  it('Debería ser una función', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('Debería eliminar un post', (done) => deletePost('id_001').then(() => getPosts((posts) => {
    const result = posts.find((element) => element.id === 'id_001');
    expect(result).toBe(undefined);
    done();
  })));
});

describe('updateLike', () => {
  it('Debería ser una función', () => {
    expect(typeof updateLike).toBe('function');
  });
  it('Debería reaccionar con un like', (done) => updateLike('id_001', 'like')
    .then(() => getPosts((data) => {
      const result = data.find((posts) => posts.likes === 'like');
      expect(result.likes).toBe('like');
      done();
    })));
});

describe('getUserData', () => {
  it('Debería ser una función', () => {
    expect(typeof getUserData).toBe('function');
  });
  it('Debería obtener información del usuario', (done) => getUserData('email', 'username')
    .then(() => {
      getUserData('uid_002')
        .then((doc) => {
          expect(doc().userId.get.email).toEqual('sulclive7@gmail.com');
          expect(doc().userId.get.username).toEqual('Jake');
        });
      done();
    }));
});
