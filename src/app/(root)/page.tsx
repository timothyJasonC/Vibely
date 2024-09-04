'use client'
import BlogLayout from '@/components/blog-layout';
import ImageLayout from '@/components/image-layout';
import LogoutButton from '@/components/LogoutButton';
import VideoLayout from '@/components/video-layout';
import { getUserCredentials } from '@/database/actions/user.action';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const authToken = Cookie.get('auth_token');
  const router = useRouter()
  const [user, setUser] = useState<any>({})

  const getUser = async () => {
    if (authToken) {
      const user = await getUserCredentials(authToken!)
      if (user === "Something went wrong please login again") {
        toast.error(user)
        router.push('/login')
      } else {
        setUser(user)
      }
    }
  }
  
  useEffect(() => {
    getUser()
  }, [])

  console.log(user);


  return (
    <>
      <div className="flex flex-wrap relative">
        <div className="Cover ">
          <Image
            width={535}
            height={145}
            alt="Pemandangan"
            src="/cover.jpg"
            className="absolute"
          />
          <div className="profile">
            <Image
              src="/blankPicture.png"
              alt="Empty profile pict"
              width={500}
              height={500}
              className="bg-white rounded-[100%] h-[139px] w-[139px] absolute -bottom-[180px] ml-9"
            />
          </div>

          <div className="relative ml-[200px] -bottom-[160px]">
            <p className="font-semibold text-[30px]">Nama Anda</p>
            <p className="">Meow Engineer</p>
          </div>
        </div>
      </div>
      <div className="flex items-center relative gap-16 bg-[#E0F4FF] -bottom-[200px] px-10 rounded-lg w-[370px] m-auto">
        <div className="text-center">
          <p className="text-black font-bold text-2xl">205</p>
          <p className="text-gray-600">Image</p>
        </div>
        <div className="text-center">
          <p className="text-black font-bold text-2xl">205</p>
          <p className="text-gray-600">Video</p>
        </div>
        <div className="text-center">
          <p className="text-black font-bold text-2xl">205</p>
          <p className="text-gray-600">Blog</p>
        </div>

      </div>
      <LogoutButton />

      {/* ImageLayout, VideoLayout, dan BlogLayout akan ditampilkan berdasarkan tombol mana yang di klik oleh user. Secara default, ImageLayout adalah bagian yang akan ditampilkan. */}
      <ImageLayout />
      {/* <VideoLayout /> */}
      {/* <BlogLayout /> */}
    </>
  );
}
