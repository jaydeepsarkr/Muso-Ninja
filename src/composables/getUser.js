import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// auth instance
const auth = getAuth();

// refs
const user = ref(auth.currentUser);

// auth state change listener
onAuthStateChanged(auth, (_user) => {
  console.log("User state change. Current user is:", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
