import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'  // Importing the correct function
import { projectAuth } from '../firebase/config'  // Using the projectAuth from your firebase config

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {
    const res = await signInWithEmailAndPassword(projectAuth, email, password)  // Use modular approach
    error.value = null
    isPending.value = false
    return res
  } catch (err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
    isPending.value = false
  }
}

const useLogin = () => {
  return { error, login  , isPending }
}

export default useLogin
