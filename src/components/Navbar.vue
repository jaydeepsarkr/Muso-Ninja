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
        <div v-if="user">
          <router-link
            :to="{ name: 'CreatePlaylist' }"
            class="btn"
            >Create Playlist</router-link
          >
          <router-link
            :to="{ name: 'UserPlaylists' }"
            class="btn"
            >My Playlists</router-link
          >
          <span>Hi There, {{ user.displayName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
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
      </div>
    </nav>
  </div>
</template>

<script>
  import useLogout from "@/composables/useLogout";
  import getUser from "@/composables/getUser";
  import { useRouter } from "vue-router";

  export default {
    name: "Navbar",
    setup() {
      const { user } = getUser();
      // if (!user.value) {
      //   // console.log("User not found");
      //   // return;
      // }
      // console.log("User found", user.value);
      const { logout } = useLogout();
      const router = useRouter();

      const handleLogout = async () => {
        await logout();
        console.log("Logged out");
        router.push({ name: "Login" });
      };

      return {
        handleLogout,
        user,
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
  span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>
