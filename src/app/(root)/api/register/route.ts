import connect from '@/database/db';
import User from '@/database/models/user.model';
import { auth } from '@/firebase/config';
import bcrypt from 'bcryptjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
    const body = await req.json();
    await connect();

    const existingUser = await User.findOne({ email: body.email, provider: 'email' });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    try {
        await createUserWithEmailAndPassword(auth, body.email, body.password);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create user in Firebase' }, { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 5)
    const newUser = new User({
        email: body.email,
        password: hashedPassword,
        provider: 'email'
    });

    try {
        await newUser.save();
        return NextResponse.json({ message: 'User is registered' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: 'Internal Server Error' }, {
            status: 500,
        });
    }
};
