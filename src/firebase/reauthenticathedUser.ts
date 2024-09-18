'use client'
import { auth } from "@/firebase/config";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";

const user = auth.currentUser;
console.log(user?.email);

export const reauthenticateUser = async (password: string) => {
    const user = auth.currentUser;
    if (user?.email) {
        const credential = EmailAuthProvider.credential(user?.email, password);

        try {
            await reauthenticateWithCredential(user, credential);
            console.log("Re-authentication successful");
        } catch (error) {
            console.error("Error during re-authentication", error);
            throw error;
        }
    } else {
        console.log("No user is logged in");
    }
};

export async function sendVerificationEmail(newEmail: string) {
    try {
        await verifyBeforeUpdateEmail(user!, newEmail);
        console.log("Verification email sent to new address. Please check your email and verify it.");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
}