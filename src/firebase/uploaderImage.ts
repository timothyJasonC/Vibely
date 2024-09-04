import { storage } from "@/firebase/config"; // Atur path sesuai dengan struktur proyek Anda
import { ref, uploadString, getDownloadURL } from "firebase/storage";

async function uploadImage(imageData: string): Promise<string> {
    if (!imageData) {
        throw new Error("No image data provided");
    }

    // Buat referensi ke lokasi di Firebase Storage
    const imageRef = ref(storage, `profile-images/${new Date().toISOString()}.jpg`);

    try {
        // Upload imageData ke Firebase Storage
        await uploadString(imageRef, imageData, 'data_url');
        
        // Ambil URL download gambar
        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw new Error("Failed to upload image");
    }
}

export default uploadImage;
