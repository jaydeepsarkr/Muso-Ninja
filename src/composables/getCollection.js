import { ref, watchEffect } from "vue";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

// Firestore instance
const db = getFirestore();

const getCollection = (collectionName, querys = []) => {
  const documents = ref(null);
  const error = ref(null);

  const constraints = [];

  // Safely build constraints
  if (Array.isArray(querys)) {
    querys.forEach((q, index) => {
      if (Array.isArray(q) && q.length === 3 && !q.includes(undefined)) {
        constraints.push(where(...q));
      } else {
        console.warn(
          `Invalid query at index ${index}: expected [field, operator, value], got`,
          q
        );
      }
    });
  }

  // Always order by createdAt last
  constraints.push(orderBy("createdAt"));

  try {
    const q = query(collection(db, collectionName), ...constraints);

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

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
    });
  } catch (err) {
    console.error("Query construction failed:", err);
    error.value = "Failed to build Firestore query";
  }

  return { documents, error };
};

export default getCollection;
