import Image from 'next/image'
import React, { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import PostForm from './PostForm'

export default function CreateIcon() {
  const [postType, setPostType] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePostType = (type: string) => {
    setPostType(type)
  }

  const closeDialog = () => setIsDialogOpen(false)

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h1 className='ml-2 font-bold text-4xl'>Select Post</h1>
        <button
          className={`border-2 rounded-2xl md:py-6 px-20 items-center mx-auto md:px-32 ${postType === 'image' ? 'border-primary-200' : 'border-main bg-white'
            }`}
          onClick={() => handlePostType('image')}
        >
          <Image src={'/img/button/LayoutImage.svg'} alt='image' width={97} height={94} />
        </button>
        <button
          className={`border-2 rounded-2xl md:py-6 px-20 items-center mx-auto md:px-32 ${postType === 'video' ? 'border-primary-200' : 'border-main bg-white'
            }`}
          onClick={() => handlePostType('video')}
        >
          <Image src={'/img/button/LayoutVideo.png'} alt='image' width={97} height={94} />
        </button>
        <button
          className={`border-2 rounded-2xl py-2 md:py-6 px-20 items-center mx-auto md:px-32 ${postType === 'blog' ? 'border-primary-200' : 'border-main bg-white'
            }`}
          onClick={() => handlePostType('blog')}
        >
          <Image src={'/img/button/LayoutBlog.svg'} alt='image' width={97} height={94} />
        </button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger disabled={postType === ''} className={`disabled:bg-main disabled:cursor-not-allowed absolute bg-primary-200 text-white text-lg px-3 right-16 bottom-12`} onClick={() => setIsDialogOpen(true)}>Next</AlertDialogTrigger>
        <AlertDialogContent className='bg-primary-50 max-md:w-[300px]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Your Post</AlertDialogTitle>
            <AlertDialogDescription>
            </AlertDialogDescription>
            <PostForm closeDialog={closeDialog} postType={postType} /> {/* Memanggil PostForm dengan prop closeDialog */}
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
