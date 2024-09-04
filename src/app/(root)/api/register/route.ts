import { auth, fireStore } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
    const body = await req.json();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, body.email, body.password);
        const user = userCredential.user;

        await setDoc(doc(fireStore, 'users', user.uid), {
            email: user.email,
            createdAt: new Date().toISOString(),
        });
        return NextResponse.json({ message: 'User is registered and data saved to Firestore' }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: error.code }, { status: 500 });
    }
};
