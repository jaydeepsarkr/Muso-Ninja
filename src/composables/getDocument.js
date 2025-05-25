import { ref, watchEffect } from "vue";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

// Firestore instance
const db = getFirestore();

const getDocument = (collectionName, id) => {
  const document = ref(null);
  const error = ref(null);

  // Reference to the specific document
  const docRef = doc(db, collectionName, id);

  // Real-time listener for the document
  const unsub = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        document.value = { ...docSnap.data(), id: docSnap.id };
        error.value = null;
      } else {
        console.error("Document not found");
        document.value = null;
        error.value = "Document not found";
      }
    },
    (err) => {
      console.error("Firestore error:", err.message);
      document.value = null;
      error.value = "Could not fetch the document";
    }
  );

  // Clean up the listener when the component is unmounted
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { document, error };
};

export default getDocument;
