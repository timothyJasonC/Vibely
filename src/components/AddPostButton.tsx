import Link from 'next/link'
import React from 'react'

export default function AddPostButton() {
  return (
    <div className='absolute w-[340px] md:w-[530px] bottom-1 md:bottom-[50px] rounded-full p-4 bg-primary-50 flex justify-center text-center text-primary-200'>
      <Link href={'/create'} className='border-4 border-primary-100 w-12 h-12 text-5xl hover:cursor-pointer flex justify-center rounded-lg items-center'>+</Link>
    </div>
  )
}
