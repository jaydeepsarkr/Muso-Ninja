<template>
  <div class="playlist-wrapper">
    <div
      v-for="playlist in playlists"
      :key="playlist.id"
      class="card"
    >
      <router-link
        :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }"
        class="card-link"
      >
        <div class="card-thumbnail">
          <img
            :src="playlist.coverUrl"
            alt="playlist cover"
          />
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ playlist.title }}</h3>
          <p class="card-creator">By {{ playlist.userName }}</p>
          <p class="card-count">{{ playlist.songs.length }} Songs</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["playlists"],
  };
</script>

<style scoped>
  .playlist-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .card {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.1);
  }

  .card-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%;
  }

  .card-thumbnail img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  .card-body {
    padding: 16px;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  .card-creator {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 4px;
  }

  .card-count {
    font-size: 0.85rem;
    color: #888;
  }

  /* Responsive tweaks */
  @media (max-width: 600px) {
    .card-thumbnail img {
      height: 140px;
    }

    .card-body {
      padding: 14px;
    }

    .card-title {
      font-size: 1rem;
    }
  }
</style>
