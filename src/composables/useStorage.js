import { ref } from "vue";
import { supabase } from "../supabase/config";
import getUser from "../composables/getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    error.value = null;
    url.value = null;

    // Ensure Firebase user is authenticated
    if (!user.value || !user.value.uid) {
      error.value = "User is not authenticated.";
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;
    filePath.value = `covers/${user.value.uid}/${fileName}`; // Use Firebase UID here

    try {
      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath.value, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("uploads")
        .getPublicUrl(filePath.value);

      if (publicUrlError) throw publicUrlError;

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to retrieve image URL.");
      }

      url.value = publicUrlData.publicUrl;
      console.log("Image uploaded. URL:", url.value);
      //   console.log(url, filePath);
    } catch (err) {
      console.error("Upload failed:", err.message);
      error.value = err.message;
    }
  };

  return {
    error,
    url,
    filePath,
    uploadImage,
  };
};

export default useStorage;
