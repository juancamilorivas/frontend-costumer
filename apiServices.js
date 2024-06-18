import { db } from "./firebase.js";
import {
  collection,
  query,
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