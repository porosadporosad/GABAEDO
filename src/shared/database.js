import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { auth, db } from 'shared/firebase';

//파이어베이스에서 유저 정보 불러오기
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map((doc) => ({
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error('유저 정보 불러오기 에러', error);
  }
};

// // 현재유저 정보 가져오기
// const getCurrentUser = () => {
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       return {
//         fullEmail: user.email,
//         nickname: user.displayName,
//         avatar: user.photoURL
//       };
//     } else {
//       return false;
//     }
//   });
//   // const user = auth.currentUser;
//   // if (!user) {
//   //   return false;
//   // }
// };

// // 커스텀
// export const useCurrentUser = () => {
//   return useQuery('currentUser', getCurrentUser);
// };

//파이어베이스에서 게시글 리스트 불러오기
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return posts;
  } catch (error) {
    console.error('게시글 리스트 불러오기 에러', error);
  }
};

//파이어베이스에서 게시글에 등록된 카페 리스트 불러오기
export const getPlaces = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'places'));
    const places = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return places;
  } catch (error) {
    console.error('카페 리스트 불러오기 에러', error);
  }
};

//회원가입, 로그인은 따로

// 파이어베이스에 장소 리스트 추가하기
export const addPlace = async () => {
  const newPlace = {
    postId: crypto.randomUUID(),
    placeId: '',
    lat: '',
    lng: '',
    placeComment: ''
  };
  try {
    const docRef = await addDoc(collection(db, 'places'), newPlace);

    console.log('add Place: ', docRef.id);

    return docRef.id;
  } catch (error) {
    console.error('게시글 추가하기 에러', error);
    throw error;
  }
};
