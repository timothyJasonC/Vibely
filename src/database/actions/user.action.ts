"use server"
import { cookies } from "next/headers";
import connect from "../db"
import User from "../models/user.model"
import { handleError } from "@/lib/utils"
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function createToken(token: string, url: string) {
    cookies().set('auth_token', token)
    redirect(url)
}

export const googleLogin = async (email: string, profilePhoto: string, username: string) => {
    try {
        await connect();
        const existingUser = await User.findOne({ email, provider: 'google' })

        if (existingUser) {
            return
        } else {
            const newUser = new User({
                email,
                provider: 'google',
                profilePhoto, username
            })
            await newUser.save()
            return
        }
    } catch (error) {
        console.error("Error creating Google user:", error);
        handleError(error);
    }
}

export const credentialsLogin = async (email: string, provider: string) => {
    const user = await User.findOne({ email, provider })
    const payload = {
        id: user.id,
    }
    const token = sign(payload, process.env.KEY_JWT!, {})
    return token
}

export const getUserCredentials = async (token: string) => {
    try {
        const data = verify(token, process.env.KEY_JWT!) as JwtPayload;
        if (data.id) {
            const user = await User.findById(data.id);
            return {user}
        }
    } catch (error) {
        return "Something went wrong please login again"
    }
}
