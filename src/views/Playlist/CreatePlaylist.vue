<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <input
        type="text"
        required
        placeholder="Playlist title"
        v-model="title"
      />
      <textarea
        required
        placeholder="Playlist description..."
        v-model="description"
      ></textarea>

      <label>Upload Playlist Cover Image</label>
      <input
        type="file"
        @change="handleChange"
      />
      <div class="error">{{ fileError }}</div>

      <button :disabled="isUploading">
        {{ isUploading ? "Uploading..." : "Create" }}
      </button>
    </form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import useStorage from "@/composables/useStorage";
  import { projectFirestore, timestamp } from "@/firebase/config";
  import { collection, addDoc } from "firebase/firestore";

  export default {
    setup() {
      const { filePath, url, uploadImage } = useStorage();
      const title = ref("");
      const description = ref("");
      const file = ref(null);
      const fileError = ref(null);
      const isUploading = ref(false);

      const handleSubmit = async () => {
        if (!title.value || !description.value) {
          fileError.value = "Please fill in the title and description.";
          return;
        }

        if (!file.value) {
          fileError.value = "Please select a cover image.";
          return;
        }

        isUploading.value = true;

        try {
          // Upload image to Supabase
          await uploadImage(file.value);

          if (!url.value) {
            throw new Error("Failed to retrieve image URL.");
          }

          // Save playlist info to Firestore
          await addDoc(collection(projectFirestore, "playlists"), {
            title: title.value,
            description: description.value,
            coverUrl: url.value,
            createdAt: timestamp,
          });

          console.log("Playlist created with image:", url.value);
          resetForm();
        } catch (error) {
          console.error("Error creating playlist:", error.message);
          fileError.value = "Failed to create playlist. Try again.";
        } finally {
          isUploading.value = false;
        }
      };

      const types = ["image/png", "image/jpeg"];

      const handleChange = (e) => {
        const selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
          file.value = selected;
          fileError.value = null;
        } else {
          file.value = null;
          fileError.value = "Please select a valid image (PNG or JPG).";
        }
      };

      const resetForm = () => {
        title.value = "";
        description.value = "";
        file.value = null;
        fileError.value = null;
      };

      return {
        title,
        description,
        handleSubmit,
        fileError,
        handleChange,
        isUploading,
      };
    },
  };
</script>

<style>
  form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
  }
  input[type="text"],
  textarea {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
  }
  input[type="file"] {
    margin-top: 10px;
  }
  label {
    font-size: 14px;
    display: block;
    margin-top: 20px;
  }
  button {
    margin-top: 20px;
    padding: 10px 15px;
    font-size: 14px;
  }
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
