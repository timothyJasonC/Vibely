import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { auth } from "@/firebase/config";
import { UserParams } from "@/types";
import { DocumentData } from "firebase/firestore";
import { UpdateProfile } from "@/database/actions/user.action";
import { updatePassword } from "firebase/auth";
import { reauthenticateUser, sendVerificationEmail } from "@/firebase/reauthenticathedUser";
import { useRouter } from "next/navigation";

interface PageProps {
    provider: string;
    user: UserParams | DocumentData
}

export default function EditProfileForm({ provider, user }: PageProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const router = useRouter()
    const userAuth = auth.currentUser;

    const formSchema = z.object({
        username: z.string().min(4, 'name must at least 8 characters').max(25, 'max characters is 25'),
        title: z.string().min(8, 'title must at least 8 characters').max(25, 'max characters is 25'),
        description: z.string().min(12, 'description must at least 12 characters').max(50, 'max characters is 50'),
        email: z.string().email('Invalid email format').optional().refine(
            (val) => !val || (val && val.length > 0),
            { message: 'Email is required', path: ['email'] }
        ),
        oldPassword: z.string().min(4, "Old password is required for authentication").optional(),
        password: z.string().optional().refine(
            (val) => !val || (val.length >= 4 && val.length <= 30),
            { message: 'Password must be between 4 and 30 characters', path: ['password'] }
        )
    });

    function changePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function changeOldPasswordVisibility() {
        setShowOldPassword(!showOldPassword);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username,
            title: user?.title,
            description: user?.description,
            email: userAuth?.email!
        },
        mode: 'all'
    });
    console.log(userAuth);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userAuth = auth.currentUser;

        if (!userAuth) {
            toast.error('No user is logged in.');
            throw new Error('error ok');
        } else {
            try {
                if (provider === 'email') {
                    if (!values.oldPassword) {
                        throw new Error('Old password is required');
                    }
                    await reauthenticateUser(values.oldPassword);
                }

                if (provider === 'email') {
                    if (values.email !== userAuth.email) {
                        await sendVerificationEmail(values.email!)
                        toast.info('Verification email sent. Please check your email to verify the new address.');
                    }
                    if (values.password) {
                        await updatePassword(userAuth, values.password);
                    }
                }

                const update = await UpdateProfile(
                    userAuth.uid,
                    values.username || user.username,
                    values.title || user.title,
                    values.description || user.description,
                );
                console.log(update);

                toast.success(`Profile updated successfully! ${values.email !== userAuth.email ? 'Verification email sent. Please check your email to verify the new address.' : ''}`);
                router.push('/')
            } catch (error: any) {
                console.error('Error updating profile:', error);
                toast.error(`Failed to update profile. ${error.message}`);
            }
        }

    }



    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Nama Kamu Disini" {...field} className="placeholder:text-gray-400 p-3 text-xs rounded-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Title Kamu Disini"  {...field} className="placeholder:text-gray-400 p-3 text-xs rounded-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Deskripsi Kamu akan ditulis Disini" {...field} className="placeholder:text-gray-400 p-3 text-xs rounded-md" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h1 className="text-2xl font-semibold mb-2">Edit Profile</h1>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Email Kamu Disini"
                                        disabled={provider !== 'email'}
                                        {...field}
                                        className="placeholder:text-gray-400 p-3 text-xs rounded-md"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showOldPassword ? "text" : "password"}
                                            placeholder="Masukkan password lama kamu disini untuk autentikasi ulang (berlaku untuk update email dan password)"
                                            disabled={provider !== 'email'}
                                            {...field}
                                            className="placeholder:text-gray-400 p-3 text-xs rounded-md"
                                        />
                                        <button onClick={changeOldPasswordVisibility} type="button" className="absolute right-4 bottom-2 z-30">
                                            <Image src={showOldPassword ? '/open.png' : '/close.png'} alt="eyes" width={24} height={24} />
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password Kamu Disini"
                                            disabled={provider !== 'email'}
                                            {...field}
                                            className="placeholder:text-gray-400 p-3 text-xs rounded-md"
                                        />
                                        <button onClick={changePasswordVisibility} type="button" className="absolute right-4 bottom-2 z-30">
                                            <Image src={showPassword ? '/open.png' : '/close.png'} alt="eyes" width={24} height={24} />
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <Link href={'/'} className="bg-main w-32 items-center text-center py-2 rounded-md">Cancel</Link>
                        <Button type="submit" className="bg-primary-200 w-32">Save</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
