<template>
  <div class="navbar">
    <nav>
      <img
        src="@/assets/ninja.png"
        alt="website logo"
      />
      <h1>
        <router-link :to="{ name: 'Home' }">Music</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link
            :to="{ name: 'CreatePlaylist' }"
            class="btn"
            id="create-playlist"
            >Create Playlist</router-link
          >
          <router-link
            :to="{ name: 'UserPlaylists' }"
            class="btn"
            id="my-playlists"
            >My Playlists</router-link
          >
          <span id="user-info"
            >Hi There, <strong>{{ user.displayName }}</strong></span
          >
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'Login' }"
            class="btn"
            id="login"
            >Login</router-link
          >
          <router-link
            :to="{ name: 'Signup' }"
            class="btn"
            id="signup"
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
    position: relative;
  }

  nav {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
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
    border-left: 5px solid #eee;
    border-right: 5px solid #eee;
  }
  span strong {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }

    nav img {
      margin-bottom: 10px;
    }

    nav h1 {
      margin: 0 0 10px 0;
    }

    nav .links,
    .gap {
      display: grid;
      /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
      gap: 20px; /* Horizontal + vertical spacing */
      padding: 20px; /* Space inside the wrapper */
    }

    nav .links a,
    button,
    span {
      margin: 8px 0;
      margin-left: 0;
      font-size: 16px;
    }

    span {
      border: none;
      padding: 0;
    }
    #create-playlist {
      padding: 20px;
      margin-right: 35px;
    }
    #my-playlists {
      padding: 20px;
    }
    #login {
      padding: 24px;
      margin-right: 35px;
    }
    #signup {
      padding: 24px;
    }
    #user-info {
      padding: 24px;
      margin-right: 35px;
      font-size: 25px;
    }
  }
</style>
