import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className="flex justify-center relative">
            <Image
                width={535}
                height={145}
                alt="Pemandangan"
                src="/cover.jpg"
                className="absolute"
            />
            <div className='p-12 absolute py-96 mx-auto z-20'>
                <h1 className='font-extrabold text-7xl'>404</h1>
                <h2 className='font-bold text-3xl'>Not Found</h2>
                <Link href={'/'} className='text-xl cursor-pointer hover:text-primary-200 transition-all duration-700'>
                    Back To Home
                </Link>
            </div>
        </div>
    )
}
