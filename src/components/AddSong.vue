<template>
  <div class="add-song">
    <button
      v-if="!showForm"
      @click="showForm = true"
    >
      Add Songs
    </button>

    <form
      v-if="showForm"
      @submit.prevent="handleSubmit"
      class="song-form"
    >
      <div class="form-header">
        <h4>Add a New Song</h4>
        <button
          type="button"
          class="close-btn"
          @click="showForm = false"
        >
          ✖
        </button>
      </div>
      <input
        type="text"
        placeholder="Song title"
        required
        v-model="title"
      />
      <input
        type="text"
        placeholder="Artist"
        required
        v-model="artist"
      />
      <input
        type="url"
        placeholder="YouTube URL"
        required
        v-model="url"
      />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import useDocument from "../composables/useDocument";

  export default {
    props: ["playlist"],
    setup(props) {
      const title = ref("");
      const artist = ref("");
      const url = ref("");
      let showForm = ref(false);
      const { updateDoc } = useDocument("playlists", props.playlist.id);

      const handleSubmit = async () => {
        const newSong = {
          id: Math.floor(Math.random() * 1000000),
          title: title.value,
          artist: artist.value,
          url: url.value,
        };

        await updateDoc({
          songs: [...props.playlist.songs, newSong],
        });

        // Clear form inputs
        title.value = "";
        artist.value = "";
        url.value = "";
        showForm.value = false;
      };

      return { title, artist, url, showForm, handleSubmit };
    },
  };
</script>

<style scoped>
  .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #999;
    transition: color 0.3s ease;
  }

  .close-btn:hover {
    color: #333;
  }
</style>
