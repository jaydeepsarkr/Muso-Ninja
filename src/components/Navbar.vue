<template>
  <div class="navbar">
    <nav>
      <img
        src="@/assets/ninja.png"
        alt="website logo"
      />
      <h1>
        <router-link :to="{ name: 'Home' }">Muso</router-link>
      </h1>
      <div class="links">
        <button @click="handleLogout">Logout</button>
        <router-link
          :to="{ name: 'Login' }"
          class="btn"
          >Login</router-link
        >
        <router-link
          :to="{ name: 'Signup' }"
          class="btn"
          >Sign Up</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
  import useLogout from "@/composables/useLogout";
  import { useRouter } from "vue-router";

  export default {
    name: "Navbar",
    setup() {
      const { logout } = useLogout();
      const router = useRouter();

      const handleLogout = async () => {
        await logout();
        console.log("Logged out");
        router.push({ name: "Login" });
      };

      return {
        handleLogout,
      };
    },
  };
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: #f8f8f8;
  }

  nav {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  nav h1 {
    margin-left: 20px;
  }

  nav .links {
    margin-left: auto;
  }

  nav .links a,
  button {
    margin-left: 16px;
    font-size: 14px;
  }
  img {
    width: 60px;
    height: 60px;
  }
</style>
