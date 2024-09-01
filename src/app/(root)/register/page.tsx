"use client"
import UserForm from '@/components/UserForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <section className="h-full flex relative">
            <div className="absolute">
                <div className="w-[400px] h-24 bg-main"></div>
                <Image src={'/waves-header.svg'} alt="waves-header" width={800} height={100} className="absolute top-4 z-10" />
            </div>

            <main className="flex flex-col gap-2 pt-32 items-center mx-auto z-20">
                <div className="flex gap-1 items-center mx-auto">
                    <Image src={'/favicon.ico'} alt="waves-top" width={40} height={40} />
                    <h1 className="tracking-widest font-extrabold text-3xl">IBELY</h1>
                </div>

                <h1 className="text-2xl font-semibold">Sign Up</h1>

                <UserForm type='Register'/>

                <div className="text-[8px] flex gap-2 mt-2">
                    <p className="font-thin">Forgot Password?</p>
                    <div className="w-[1px] bg-gray-300 h-[12px]"></div>
                    <p className="font-thin">Do You Have Account? <Link rel="stylesheet" className="font-medium" href={'/login'} >Login !</Link></p>
                </div>

            </main>

            <div className="absolute bottom-0">
                <div className="w-[400px] h-24 bg-main"></div>
                <Image src={'/waves-top.svg'} alt="waves-top" width={800} height={100} className="absolute -top-24 z-10" />
                <Image src={'/waves-top.svg'} alt="waves-top" width={800} height={100} className="absolute rotate-180 -top-8 z-10" />
            </div>

        </section>
    )
}

export default page
