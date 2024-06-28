import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  doc,
  orderBy,
  getDocs,
  getDoc,
  limit,
  startAfter,
  onSnapshot,
  where,
} from "firebase/firestore";

// FETCH POSTS ON SNAPSHOT
export const fetchPostsOnSnapshot = (postsPerLoad, onData, onError, uid) => {
  // console.log("soy el uidddddddd", uid)
  const q = query(
    collection(db, "shipments"),
    where("uidClient", "==", uid),
    orderBy("createdAt", "desc"),
    limit(postsPerLoad)
  );
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData.postId = doc.id;
        posts.push(postData);
        // console.log("FETCH POSTS ONSNAPSHOT");
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      onData({ posts, lastVisible });
    },
    onError
  );

  return unsubscribe;
};

// //// FETCH MORE POSTS ON SNAPSHOT
export const fetchMorePostsOnSnapshot = (
  postsPerLoad,
  lastVisible,
  onData,
  onError,
  uid
) => {
  const q = query(
    collection(db, "shipments"),
    where("uidClient", "==", uid),
    orderBy("createdAt", "desc"),
    limit(postsPerLoad),
    startAfter(lastVisible) // Fetch posts after the last visible one
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData.postId = doc.id;
        posts.push(postData);
      });

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      onData({ posts, lastVisible: newLastVisible });
    },
    onError
  );

  return unsubscribe;
};

// FETCH FAVORITES ON SNAPSHOT
export const fetchFavoritesOnSnapshot = (
  postsPerLoad,
  onData,
  onError,
  uid
) => {
  const q = query(
    collection(db, `users/${uid}/favoriteAddresses`),
    orderBy("createdAt", "asc"),
    limit(postsPerLoad)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = [];

      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData.postId = doc.id;
        posts.push(postData);
        // console.log("FETCH POSTS ONSNAPSHOT");
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      onData({ posts, lastVisible });
    },
    onError
  );

  return unsubscribe;
};

//// FETCH MORE FAVORITES ON SNAPSHOT
export const fetchMoreFavoritesOnSnapshot = (
  postsPerLoad,
  lastVisible,
  onData,
  onError,
  uid
) => {
  const q = query(
    collection(db, `users/${uid}/favoriteAddresses`),
    orderBy("createdAt", "asc"),
    limit(postsPerLoad),
    startAfter(lastVisible) // Fetch posts after the last visible one
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData.postId = doc.id;
        posts.push(postData);
      });

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      onData({ posts, lastVisible: newLastVisible });
    },
    onError
  );

  return unsubscribe;
};


// FETCH SERVICES ON SNAPSHOT
export const fetchServicesOnSnapshot = (postsPerLoad, onData, onError, uid) => {
  const q = query(
    collection(db, "services"),
    where("uidClient", "==", uid),
    orderBy("createdAt", "desc"),
    limit(postsPerLoad)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData.postId = doc.id;
        posts.push(postData);
        // console.log("FETCH POSTS ONSNAPSHOT");
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      onData({ posts, lastVisible });
    },
    onError
  );

  return unsubscribe;
};

//// FETCH MORE SERVICES ON SNAPSHOT
export const fetchMoreServicesOnSnapshot = (
  postsPerLoad,
  lastVisible,
  onData,
  onError,
  uid
) => {
  const q = query(
    collection(db, "services"),
    where("uidClient", "==", uid),
    orderBy("createdAt", "desc"),
    limit(postsPerLoad),
    startAfter(lastVisible) // Fetch posts after the last visible one
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData.postId = doc.id;
        posts.push(postData);
      });

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      onData({ posts, lastVisible: newLastVisible });
    },
    onError
  );

  return unsubscribe;
};

// FETCH PERSONAL DATA ON SNAPSHOT
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

// FETCH PERSONAL DATA
export const fetchPersonalData = async (uid) => {
  const docRef = doc(db, `users/${uid}`);
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.warn("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo el documento: ", error);
    return null;
  }
};

// FETCH FAVORITES
export const fetchFavoriteData = async (uid) => {
  const collectionRef = collection(db, `users/${uid}/favoriteAddresses`);
  try {
    const querySnapshot = await getDocs(collectionRef);
    const favoriteAddresses = [];
    querySnapshot.forEach((doc) => {
      favoriteAddresses.push(doc.data());
    });
    return favoriteAddresses;
  } catch (error) {
    console.error("Error obteniendo el documento: ", error);
    return null;
  }
};

// SAVE FAVORITE
export async function saveFavoriteAddress(
  uid,
  nombre,
  apellido,
  celular,
  ciudad,
  direccion
) {
  const data = {
    name: nombre,
    surname: apellido,
    cellPhone: celular,
    destinyDaneCode: ciudad,
    destinationAddress: direccion,
    createdAt: new Date(),
  };
  console.log(data, uid);

  try {
    await addDoc(collection(db, `users/${uid}/favoriteAddresses`), data);
  } catch (e) {
    console.error("Error al agregar el documento: ", e);
  }
}

// DELETE FAVORITE
export const deleteFavoriteAddress = async (uid, idDocument) => {
  const userRef = doc(db, `users/${uid}/favoriteAddresses/${idDocument}`);
  try {
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
