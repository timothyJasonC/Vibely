'use client'
import UserForm from "@/components/UserForm"
import { auth } from "@/firebase/config"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function Page() {
    const router = useRouter()
    const getUser = async () => {
        const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
            if (user) {
                router.push('/')
            } else {
                return
            }
            return () => unsubscribe()
        })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <section className="h-full flex relative">
            <div className="absolute top-0 left-0">
                <div className="w-[1000px] h-40 bg-main"></div>
                <Image src={'/waves-header.svg'} alt="waves-header" width={532} height={200} className="size-[1000px] h-36 absolute top-8 -left-64 z-10" />
            </div>

            <main className="flex flex-col gap-2 items-center justify-center -mt-52 mx-auto z-20">
                <div className="flex gap-1 items-center mx-auto">
                    <Image src={'/favicon.ico'} alt="waves-top" width={50} height={50} />
                    <h1 className="tracking-widest font-extrabold text-4xl">IBELY</h1>
                </div>

                <h1 className="text-3xl font-semibold">Login</h1>

                <UserForm type='Login' />

                <div className="text-[8px] flex gap-2 mt-2">
                    <p className="font-extralight">Forgot Password?</p>
                    <div className="w-[1px] bg-gray-300 h-[12px]"></div>

                    <p className="font-thin">Need New Account? <Link rel="stylesheet" className="font-medium" href={'/register'} >Signup !</Link></p>
                </div>

            </main>

            <div className="absolute bottom-0">
                <div className="w-[1000px] h-40 bg-main"></div>
                <Image src={'/waves-top.svg'} alt="waves-top" width={800} height={100} className="size-[1000px] h-36 absolute -left-64 -top-40 z-10" />
                <Image src={'/waves-top.svg'} alt="waves-top" width={800} height={100} className="size-[1000px] h-36 absolute -left-64 rotate-180 -top-12 z-10" />
            </div>

        </section>
    )
}

export default Page;
