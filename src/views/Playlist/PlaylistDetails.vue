<template>
  <div
    class="error"
    v-if="error"
  >
    {{ error }}
  </div>

  <div
    v-if="playlist"
    class="playlist-details"
  >
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">
        Created by - <strong>{{ playlist.userName }}</strong>
      </p>
      <p class="description">{{ playlist.description }}</p>
      <button
        v-if="ownership"
        @click="handleDelete"
      >
        Delete Playlist
      </button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div
        v-for="song in playlist.songs"
        :key="song.id"
        class="single-song"
      >
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <div class="gap">
          <button
            class="play-btn"
            @click="playSong(song.url)"
          >
            ▶
          </button>
          <button
            v-if="ownership"
            @click="handleClick(song.id)"
          >
            delete
          </button>
        </div>
      </div>

      <AddSong
        :playlist="playlist"
        v-if="ownership"
      />
    </div>

    <!-- Audio player and messages -->
    <div
      v-if="loading"
      class="loading"
    >
      Loading audio...
    </div>
    <div
      v-if="apiError"
      class="error"
    >
      {{ apiError }}
    </div>
    <audio
      v-if="currentAudioUrl"
      :src="currentAudioUrl"
      controls
      autoplay
      class="audio-player"
    />
  </div>
</template>

<script>
  import AddSong from "@/components/AddSong.vue";
  import useDocument from "@/composables/useDocument";
  import getDocument from "@/composables/getDocument";
  import getUser from "@/composables/getUser";
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";

  export default {
    props: ["id"],
    components: { AddSong },
    setup(props) {
      const { error, document: playlist } = getDocument("playlists", props.id);
      const { user } = getUser();
      const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
      const router = useRouter();

      const currentAudioUrl = ref("");
      const loading = ref(false);
      const apiError = ref("");

      const ownership = computed(() => {
        return (
          playlist.value &&
          user.value &&
          user.value.uid == playlist.value.userId
        );
      });

      const extractVideoID = (url) => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/);
        return match ? match[1] : null;
      };

      const playSong = async (url) => {
        const videoId = extractVideoID(url);
        if (!videoId) {
          apiError.value = "Invalid YouTube URL.";
          return;
        }

        loading.value = true;
        currentAudioUrl.value = "";
        apiError.value = "";

        try {
          const res = await fetch(
            `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
            {
              method: "GET",
              headers: {
                "X-RapidAPI-Key":
                  "da0bbb2e99msh7e80c2ea877ec8ep1aee93jsna6512be9ae22",
                "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
              },
            }
          );

          const data = await res.json();

          if (data.status === "ok" && data.link) {
            currentAudioUrl.value = data.link;
          } else {
            apiError.value = "Failed to convert video.";
          }
        } catch (err) {
          apiError.value = "API Error: " + err.message;
        } finally {
          loading.value = false;
        }
      };

      const handleDelete = async () => {
        await deleteDoc();
        router.push({ name: "Home" });
      };

      const handleClick = (id) => {
        const songs = playlist.value.songs.filter((song) => song.id != id);
        updateDoc({ songs });
        console.log("Song removed from playlist");
      };

      return {
        error,
        playlist,
        ownership,
        handleDelete,
        handleClick,
        playSong,
        currentAudioUrl,
        apiError,
        loading,
      };
    },
  };
</script>

<style scoped>
  .playlist-details {
    padding: 20px;
  }
  .playlist-info {
    margin-bottom: 30px;
  }
  .cover img {
    width: 150px;
    height: auto;
    border-radius: 8px;
  }
  .song-list {
    margin-top: 20px;
  }
  .single-song {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .details {
    flex: 1;
  }
  .play-btn {
    font-size: 13px;
    cursor: pointer;
  }
  .audio-player {
    width: 100%;
    margin-top: 20px;
  }
  .loading {
    color: #555;
    margin-top: 10px;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  .gap {
    display: flex;
    gap: 10px;
  }
</style>
