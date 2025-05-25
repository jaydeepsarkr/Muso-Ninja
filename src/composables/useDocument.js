import { ref } from "vue";
import {
  doc,
  deleteDoc as firebaseDeleteDoc,
  updateDoc as firebaseUpdateDoc,
} from "firebase/firestore";
import { projectFirestore } from "@/firebase/config";

const useDocument = (collectionName, id) => {
  const error = ref(null);
  const isPending = ref(false);

  // Create document reference
  const docRef = doc(projectFirestore, collectionName, id);

  // Delete document
  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await firebaseDeleteDoc(docRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.error("Error deleting document:", err.message);
      error.value = "Could not delete the document";
      isPending.value = false;
    }
  };

  // Update document
  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      await firebaseUpdateDoc(docRef, updates);
      isPending.value = false;
    } catch (err) {
      console.error("Error updating document:", err.message);
      error.value = "Could not update the document";
      isPending.value = false;
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
