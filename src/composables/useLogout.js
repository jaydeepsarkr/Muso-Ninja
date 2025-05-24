import { ref } from "vue";
import { signOut } from "firebase/auth";
import { projectAuth } from "../firebase/config"; // use the correct import

// refs
const error = ref(null);

// logout function
const logout = async () => {
  error.value = null;

  try {
    await signOut(projectAuth);
  } catch (err) {
    console.error(err.message);
    error.value = err.message;
  }
};

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
