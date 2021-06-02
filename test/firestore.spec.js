import '../_mocks_/firebase-mock.js';
import { addPosts, updatePost } from '../src/firebase-controllers/fireStore-controller.js';

// const fixtureData = {
//   _collection_: {
//     posts: {
//       _doc_: {
//         post001: {
//           date: '27/5/2021 11:01:06',
//           publication:'hola',
//           userId: 'abcx1',
//         },
//       },
//     },
//   },
// };

describe('addPosts', () => {
  it('Debería ser una función', () => {
    expect(typeof addPosts).toBe('function');
  });
  // it('Debería agregar una publicación', done => addPosts('', 'mock', 'post').then(() => {
  //   const callback = (post) => {
  //     const result = post.find(e => e.post === 'mock');
  //     expect(result.name).toEqual('mock');
  //     done();
  //   };
  //   getPosts(callback);
  // }));
});

describe('updatePost', () => {
  it('Debería ser una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  // it('Debería editar un post', done => updatePost('post1', 'nota editada').then(() => {
  //   const callback = (post) => {
  //     const result = post.find(element => element.id === 'post1');
  //     expect(result.post).toBe('nota editada');
  //     done();
  //   };
  //   getPosts(callback);
  // }));
});
