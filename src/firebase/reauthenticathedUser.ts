'use client'
import { auth } from "@/firebase/config";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";

const user = auth.currentUser;

export const reauthenticateUser = async (password: string) => {
    const user = auth.currentUser;
    if (user?.email) {
        const credential = EmailAuthProvider.credential(user?.email, password);

        try {
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            throw error;
        }
    } else {
        return
    }
};

export async function sendVerificationEmail(newEmail: string) {
    try {
        await verifyBeforeUpdateEmail(user!, newEmail);
    } catch (error: any) {
        throw new Error(error.message)
    }

}