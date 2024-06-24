import { db } from "./firebase.js";
import {
  collection,
  query,
  doc,
  orderBy,
  getDocs,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";





//GET POSTS
export const fetchPosts = async (postsPerLoad) => {
  const posts = [];

  try {
    const q = query(
      collection(db, "blogPosts"),
      orderBy("createdAt", "desc"),
      limit(postsPerLoad)
    );
    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    });

    return { posts, lastVisible };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
};




//GET MORE POSTS
export const fetchMorePosts = async (startAfterr, postsPerLoad) => {
  const posts = [];

  try {
    const q = query(
      collection(db, "blogPosts"),
      orderBy("createdAt", "desc"),
      startAfter(startAfterr),
      limit(postsPerLoad)
    );
    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    // console.log("last", lastVisible.id);

    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    });

    return { posts, lastVisible };
  } catch (error) {
    // console.error("Error fetching posts:", error);
    return { error: "Error fetching posts" };
  }
};





// FETCH POSTS ON SNAPSHOT
export const fetchPostsOnSnapshot = (postsPerLoad, onData, onError, uid) => {
  // console.log("soy el uidddddddd", uid)
  const q = query(
    // collection(db, "blogPosts"),
        collection(db, `users/${uid}/shipments`),
    orderBy("createdAt", "asc"),
    limit(postsPerLoad)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    // console.log("FETCH POSTS ONSNAPSHOT");
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    onData({ posts, lastVisible });
  }, onError);

  return unsubscribe;
};








//// FETCH MORE POSTS ON SNAPSHOT
export const fetchMorePostsOnSnapshot = (postsPerLoad, lastVisible, onData, onError, uid) => {
  // console.log("jajajajajajajaj", uid)
  const q = query(
    // collection(db, "blogPosts"),
    collection(db, `users/${uid}/shipments`),
    orderBy("createdAt", "asc"),
    limit(postsPerLoad),
    startAfter(lastVisible) // Fetch posts after the last visible one
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    });

    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    onData({ posts, lastVisible: newLastVisible });
  }, onError);

  return unsubscribe;
};























// FETCH FAVORITES ON SNAPSHOT
export const fetchFavoritesOnSnapshot = (postsPerLoad, onData, onError, uid) => {
  const q = query(
        collection(db, `users/${uid}/favoriteAddresses`),
    orderBy("createdAt", "asc"),
    limit(postsPerLoad)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    // console.log("FETCH POSTS ONSNAPSHOT");
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    onData({ posts, lastVisible });
  }, onError);

  return unsubscribe;
};








//// FETCH MORE FAVORITES ON SNAPSHOT
export const fetchMoreFavoritesOnSnapshot = (postsPerLoad, lastVisible, onData, onError, uid) => {
  const q = query(
    collection(db, `users/${uid}/favoriteAddresses`),
    orderBy("createdAt", "asc"),
    limit(postsPerLoad),
    startAfter(lastVisible) // Fetch posts after the last visible one
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    });

    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    onData({ posts, lastVisible: newLastVisible });
  }, onError);

  return unsubscribe;
};
































// FETCH FAVORITES ON SNAPSHOT
export const fetchServicesOnSnapshot = (postsPerLoad, onData, onError, uid) => {
  const q = query(
        collection(db, `users/${uid}/services`),
    orderBy("createdAt", "desc"),
    limit(postsPerLoad)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    // console.log("FETCH POSTS ONSNAPSHOT");
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    onData({ posts, lastVisible });
  }, onError);

  return unsubscribe;
};








//// FETCH MORE FAVORITES ON SNAPSHOT
export const fetchMoreServicesOnSnapshot = (postsPerLoad, lastVisible, onData, onError, uid) => {
  const q = query(
    collection(db, `users/${uid}/services`),
    orderBy("createdAt", "desc"),
    limit(postsPerLoad),
    startAfter(lastVisible) // Fetch posts after the last visible one
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      let postData = doc.data();
      postData.postId = doc.id;
      posts.push(postData);
    });

    const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    onData({ posts, lastVisible: newLastVisible });
  }, onError);

  return unsubscribe;
};















// FETCH PERSONAL DATA ON SNAPSHOT
// export const fetchPersonalDataOnSnapshot = (uid) => {
//   const docRef = doc(db, `users/${uid}`);

//   return onSnapshot(docRef, (doc) => {
//       console.log("Current data: ", doc.data());
//   });
// };

export const fetchPersonalDataOnSnapshot = (uid, callback) => {
  const docRef = doc(db, `users/${uid}`);

  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data()); // Llama al callback con los datos del documento
    } else {
      callback(null); // Maneja el caso donde el documento no existe
    }
  });
  return unsubscribe; // Retorna la función de limpieza de la suscripción
};