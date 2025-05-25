<template>
  <div class="home">
    <div
      v-if="error"
      class="error"
    >
      Could not fetch the data
    </div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
  import ListView from "../components/ListView.vue";
  import getCollection from "../composables/getCollection";

  export default {
    name: "Home",
    components: { ListView },
    setup() {
      const { error, documents } = getCollection("playlists");

      return { error, documents };
    },
  };
</script>
<style scoped>
  .home {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  }

  .error {
    color: #b00020;
    background-color: #ffe6e6;
    border-left: 6px solid #b00020;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    font-weight: 600;
    text-align: center;
  }

  .list-view {
    margin-top: 1rem;
  }
</style>
