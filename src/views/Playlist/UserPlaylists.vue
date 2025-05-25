<template>
  <div class="user-playlists">
    <h2>My playlists</h2>
  </div>
  <div v-if="playlists">
    <ListView :playlists="playlists" />
  </div>
  <router-link
    class="btn"
    :to="{ name: 'CreatePlaylist' }"
    >Create new playlist</router-link
  >
</template>

<script>
  import getUser from "@/composables/getUser";
  import getCollection from "@/composables/getCollection";
  import ListView from "@/components/ListView.vue";
  export default {
    name: "UserPlaylists",
    components: {
      ListView,
    },
    setup() {
      const { user } = getUser();
      const { documents: playlists } = getCollection("playlists", [
        "userId",
        "==",
        user.value.uid,
      ]);
      console.log("UserPlaylists", playlists);

      return {
        playlists,
      };
    },
  };
</script>

<style></style>
