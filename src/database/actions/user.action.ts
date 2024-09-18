// "use server"
import { doc, setDoc, getDocs, query, where, collection, getDoc, DocumentData, updateDoc } from 'firebase/firestore';
import { fireStore } from "@/firebase/config";

export const googleLogin = async (email: string, profilePhoto: string, username: string, uid: string) => {
    try {
        const userRef = doc(fireStore, 'users', uid);

        const userDoc = await getDocs(query(collection(fireStore, 'users'), where('email', '==', email)));

        if (!userDoc.empty) {
            const existingUserUid = userDoc.docs[0].id;
            return existingUserUid;
        }

        await setDoc(userRef, {
            email,
            profilePhoto,
            username,
            createdAt: new Date().toISOString(),
        });
        return uid
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const getUserCredentials = async (userId: string) => {
    try {
        const userRef = doc(fireStore, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc) {
            return userDoc.data()
        }
    } catch (error) {
        return
    }
}

export const UpdateImageProfile = async (userId: string, newProfilePhoto: string) => {
    const userRef = doc(fireStore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        await updateDoc(userRef, { profilePhoto: newProfilePhoto });
        const updatedUserDoc = await getDoc(userRef);
        const { profilePhoto } = updatedUserDoc.data() as DocumentData
        return profilePhoto
    } else {
        throw new Error('User document not found');
    }
}

export const UpdateProfile = async (userId: string, username: string, title: string, description: string) => {
    const userRef = doc(fireStore, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        await updateDoc(userRef, { username, title, description });
        const updatedUserDoc = await getDoc(userRef);
        return updatedUserDoc
    } else {
        throw new Error('User document not found');
    }
}