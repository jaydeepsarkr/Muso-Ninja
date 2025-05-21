import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";

// refs
const error = ref(null);

// auth instance
const auth = getAuth();

// logout function
const logout = async () => {
  error.value = null;

  try {
    await signOut(auth);
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
