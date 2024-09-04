'use client'
import ImageProfileEdit from '@/components/ImageProfileEdit';
import LogoutButton from '@/components/LogoutButton';
import { getUserCredentials } from '@/database/actions/user.action';
import { UserParams } from '@/types';
import { DocumentData } from 'firebase/firestore';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const authToken = Cookie.get('auth_token');
  const router = useRouter()
  const [user, setUser] = useState<UserParams | DocumentData>()

  const getUser = async () => {
    if (authToken) {
      const userData = await getUserCredentials(authToken!)
      if (userData === "Something went wrong please login again") {
        toast.error(userData)
        router.push('/login')
      } else {
        setUser(userData)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const changeImage = () => {
    console.log('ok');

  }
  // console.log(user);


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
          <div className="profile absolute top-24 left-12 rounded-full h-[139px] w-[139px]" >
            <Image
              src={user?.profilePhoto ? user.profilePhoto : "/blankPicture.png"}
              alt="Empty profile pict"
              width={200}
              height={200}
              className="bg-white border-2 border-white rounded-full"
            />
            <ImageProfileEdit/>
            {/* <button onClick={changeImage} className='absolute rounded-full inset-0 top-0 hover:opacity-100 hover:cursor-pointer opacity-0 h-[139px] w-[139px] border-white transition-opacity duration-300 flex justify-center items-center bg-gray-400 bg-opacity-50 z-20'>
              <span className='text-white text-sm font-extrabold hover:opacity-100'>Change</span>
            </button> */}
          </div>
          <div className="relative ml-[200px] -bottom-[160px]">
            <p className="font-semibold text-[30px]">{user?.username ? user.username : 'Nama Anda'}</p>
            <p className="">{user?.title ? user.title : 'Meow Engineer'}</p>
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
    </>
  );
}
