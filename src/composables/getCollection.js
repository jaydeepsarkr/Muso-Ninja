import { ref, watchEffect } from "vue";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// Firestore instance (you can also export this from your firebase/config.js)
const db = getFirestore();

const getCollection = (collectionName) => {
  const documents = ref(null);
  const error = ref(null);

  // Create the query for Firestore
  const q = query(collection(db, collectionName), orderBy("createdAt"));

  // Real-time listener
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const results = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          results.push({ ...data, id: doc.id });
        }
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.error("Firestore error:", err.message);
      documents.value = null;
      error.value = "Could not fetch the data";
    }
  );

  // Cleanup Firestore listener when component unmounts
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents, error };
};

export default getCollection;
