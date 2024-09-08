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
    // Upload fileData ke Firebase Storage
    await uploadString(fileRef, fileData, 'data_url');
    
    // Ambil URL download file
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw new Error("Failed to upload file");
  }
}

export async function deleteImage(fileUrl: string): Promise<void> {
  if (!fileUrl) {
    throw new Error("No file URL provided");
  }

  try {
    // Buat referensi ke lokasi di Firebase Storage berdasarkan URL
    const fileRef = ref(storage, fileUrl);

    // Hapus file dari Firebase Storage
    await deleteObject(fileRef);

    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file: ", error);
    throw new Error("Failed to delete file");
  }
}
