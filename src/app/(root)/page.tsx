
"use client";
import ButtonSwitchPost from "@/components/ButtonSwitchPost";
import LogoutButton from "@/components/LogoutButton";
import BlogLayout from '@/components/blog-layout';
import ImageLayout from '@/components/image-layout';
import ImageProfileEdit from '@/components/ImageProfileEdit';
import VideoLayout from '@/components/video-layout';
import { getUserCredentials } from '@/database/actions/user.action';
import { TabType, UserParams } from '@/types';
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
  const [category, setCategory] = useState<TabType>("image");


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

  //ini main
  useEffect(() => {
    getUser();
  }, []);

  const changeImage = () => {
    console.log('ok');

  }

  return (
    <>
      <LogoutButton />
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
              className="bg-white w-[139px] h-[139px] object-cover border-2 border-white rounded-full"
            />
            <ImageProfileEdit setUser={setUser} />
          </div>
          <div className="relative ml-[200px] -bottom-[160px]">
            <p className="font-semibold text-[30px]">{user?.username ? user.username : 'Nama Anda'}</p>
            <p className="">{user?.title ? user.title : 'Meow Engineer'}</p>
          </div>
        </div>
      </div>
      <div className="total-post flex items-center relative gap-16 bg-[#E0F4FF] m-auto -bottom-[195px] px-10 rounded-[25px] w-[444px]  py-[3px]">
        <div className="flex gap-16 m-auto">
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
      </div>

      <section className="description absolute flex bottom-[529px] w-[444px] px-9 py-[19.5px] rounded-[25px] ml-11 bg-[#E0F4FF] leading-[22.5px] text-[15px] tracking-[5%]">
        <p className="flex text-center">
          Deskripsi akun akan ada diisni dan akan panjang tetapi tetap di dalam
          kotak ini agar membatasi dan kotaknya tidak akan terlihat saat sudah
          ada ini dan jangan lupa gunakan pembatas huruf ya
        </p>
      </section>

      <ButtonSwitchPost category={category} setCategory={setCategory} />
      
      <section className='absolute bottom-16 w-[537px] h-[400px] overflow-y-auto scrollbar-hide'>
        {category === "image" && <ImageLayout />}
        {category === "video" && <VideoLayout />}
        {category === "blog" && <BlogLayout />}
      </section>


     
    </>
  );
};
