<template>
  <div class="user-playlists">
    <h2>My playlists</h2>

    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>

    <router-link
      class="btn"
      :to="{ name: 'CreatePlaylist' }"
    >
      Create new playlist
    </router-link>
  </div>
</template>

<script>
  import getUser from "@/composables/getUser";
  import getCollection from "@/composables/getCollection";
  import ListView from "@/components/ListView.vue";

  export default {
    name: "UserPlaylists",
    components: { ListView },
    setup() {
      const { user } = getUser();

      // Wrap query in an array for getCollection
      const { documents: playlists } = getCollection("playlists", [
        ["userId", "==", user.value.uid],
      ]);

      console.log("UserPlaylists", playlists);

      return { playlists };
    },
  };
</script>

<style scoped>
  .user-playlists {
    max-width: 900px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
  }

  .user-playlists h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
    color: #2c3e50;
    letter-spacing: 1px;
  }

  /* Container holding the playlists list (ListView component) */
  .user-playlists > div {
    margin-bottom: 30px;
  }

  /* Responsive tweaks */
  @media (max-width: 600px) {
    .user-playlists {
      margin: 20px 10px;
    }

    .user-playlists h2 {
      font-size: 1.6rem;
    }

    .btn {
      width: 100%;
      padding: 14px 0;
      border-radius: 24px;
    }
  }
</style>
