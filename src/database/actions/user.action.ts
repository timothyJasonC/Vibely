"use server"
import { cookies } from "next/headers";
import { handleError } from "@/lib/utils"
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { doc, setDoc, getDocs, query, where, collection, getDoc, DocumentData, updateDoc } from 'firebase/firestore';
import { fireStore } from "@/firebase/config";

export async function createToken(token: string, url: string) {
    cookies().set('auth_token', token)
    redirect(url)
}

export const googleLogin = async (email: string, profilePhoto: string, username: string, uid: string) => {
    try {
        const userRef = doc(fireStore, 'users', uid);

        const userDoc = await getDocs(query(collection(fireStore, 'users'), where('email', '==', email)));

        if (!userDoc.empty) {
            console.log("User already exists, skipping creation.");
            const existingUserUid = userDoc.docs[0].id;
            return existingUserUid;
        }

        await setDoc(userRef, {
            email,
            profilePhoto,
            username,
            createdAt: new Date().toISOString(),
        });
        console.log("User created successfully.");
        return uid
    } catch (error) {
        console.error("Error creating Google user:", error);
        handleError(error);
    }
}

export const credentialsLogin = async (userId: string) => {
    const payload = {
        userId
    }
    const token = sign(payload, process.env.KEY_JWT!, {})
    return token
}

export const getUserCredentials = async (token: string) => {
    try {
        const data = verify(token, process.env.KEY_JWT!) as JwtPayload;
        if (data) {
            const userRef = doc(fireStore, 'users', data.userId);
            const userDoc = await getDoc(userRef);
            if (userDoc) {
                const { email, ...filteredData } = userDoc.data() as DocumentData
                return filteredData
            }
        }
    } catch (error) {
        return "Something went wrong please login again"
    }
}

export const UpdateImageProfile = async (token: string, newProfilePhoto: string) => {
    const data = verify(token, process.env.KEY_JWT!) as JwtPayload;
    if (data) {
        const userRef = doc(fireStore, 'users', data.userId);
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

}