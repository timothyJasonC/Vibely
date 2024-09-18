import { storage } from "@/firebase/config"; // Atur path sesuai dengan struktur proyek Anda
import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";

export async function uploadImage(fileData: string, path: string): Promise<string> {
  if (!fileData) {
    throw new Error("No file data provided");
  }

  // Tentukan ekstensi file berdasarkan tipe data URL
  const isImage = fileData.startsWith("data:image/");
  const fileExtension = isImage ? "jpg" : "mp4";
  
  // Buat referensi ke lokasi di Firebase Storage
  const fileRef = ref(storage, `${path}/${new Date().toISOString()}.${fileExtension}`);
  
  try {
    await uploadString(fileRef, fileData, 'data_url');
    
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
}

export async function deleteImage(fileUrl: string): Promise<void> {
  if (!fileUrl) {
    throw new Error("No file URL provided");
  }

  try {
    const fileRef = ref(storage, fileUrl);

    await deleteObject(fileRef);

  } catch (error) {
    throw new Error("Failed to delete file");
  }
}
