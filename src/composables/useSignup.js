import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Initialize auth
const auth = getAuth();

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;

  try {
    // Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Could not complete signup");
    }

    // Update profile with displayName
    await updateProfile(res.user, { displayName });

    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
