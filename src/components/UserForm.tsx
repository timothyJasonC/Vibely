import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userDefaultValues } from '@/constants'
import { auth } from "@/firebase/config";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { createToken, credentialsLogin, googleLogin } from "@/database/actions/user.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


type UserFormProps = {
    type: "Register" | "Login"
}

function UserForm({ type }: UserFormProps) {
    const router = useRouter()
    const formSchema = z.object({
        email: z.string().email().nonempty("Email is required"),
        password: z.string().min(4, "Password must be at least 4 characters").max(30),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userDefaultValues,
        mode: "all",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (type == 'Register') {
            try {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(values)
                })
                const result = await res.json()
                if (result.message == 'User is registered') {
                    toast.success(result.message)
                    router.push('/login')
                } else {
                    toast.error(result.message)
                }
            } catch (error) {
                toast.error('Internal server error')
            }
        }

        if (type === 'Login') {
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                const token = await credentialsLogin(values.email, 'email')

                toast.success("Login successful");
                setTimeout(() => {
                    toast.success("Redirecting to Dashboard")
                    createToken(token, '/')
                }, 1500);
            } catch (error) {
                toast.error('Email Or Password Wrong')
            }
        }
    }

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            if (user) {
                await googleLogin(user.email!, user.photoURL!, user.displayName!)

                const token = await credentialsLogin(user.email!, 'google')

                toast.success("Login successful");
                setTimeout(() => {
                    toast.success("Redirecting to Dashboard")
                    createToken(token, '/')
                }, 1500);
            }
        } catch (error) {
            toast.error("Error logging in with Google:")
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[356px] gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Masukkan Email" {...field} className="bg-main placeholder:text-black p-3 text-xs rounded-md" />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Masukkan Password" {...field} className="bg-main placeholder:text-black p-3 text-xs rounded-md" />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-primary-100 p-1 text-white font-bold text-2xl rounded-md">{type == 'Register' ? 'CREATE' : 'LOGIN'}</Button>
                </form>
            </Form>

            <div className="relative">
                <div className="w-[250px] bg-gray-300 h-[1px] absolute top-[15px] z-0 -left-[125px]"></div>
                <h1 className="font-thin bg-white absolute -left-[14px] p-1">OR</h1>
            </div>

            <button onClick={loginWithGoogle} className=" border-2 p-1 border-primary-100 w-full font-bold text-2xl rounded-md mt-8 hover:bg-primary-100 transition-all hover:text-white">GOOGLE</button>

        </>

    )
}

export default UserForm
