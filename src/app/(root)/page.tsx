"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ButtonSwitchPost from "@/components/ButtonSwitchPost";
import LogoutButton from "@/components/LogoutButton";
import BlogLayout from '@/components/blog-layout';
import ImageLayout from '@/components/image-layout';
import ImageProfileEdit from '@/components/ImageProfileEdit';
import VideoLayout from '@/components/video-layout';
import { getUserCredentials } from '@/database/actions/user.action';
import { TabType, UserParams } from '@/types';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddPostButton from "@/components/AddPostButton";
import { getPostCountsByUser, getPostsByUser } from "@/database/actions/post.action";
import { auth } from "@/firebase/config";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";

export default function Home() {
  const router = useRouter()
  const [category, setCategory] = useState<TabType>("image");
  const [user, setUser] = useState<UserParams | DocumentData>()
  const [posts, setPosts] = useState<DocumentData[] | string>([]);
  const [postCounts, setPostCounts] = useState<Record<string, number>>({ image: 0, video: 0, blog: 0 });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        try {
          const userData = await getUserCredentials(user.uid);
          setUser(userData);

          const counts = await getPostCountsByUser(user.uid);
          if (typeof counts === 'object') {
            setPostCounts(counts);
          } else {
            toast.error(counts);
          }

          const postsData = await getPostsByUser(user.uid, category);
          setPosts(postsData || []);
        } catch (error) {
          toast.error("Failed to fetch user data or posts.");
        }
      } else {
        setUser(undefined)
        setPosts([])
        setPostCounts({ image: 0, video: 0, blog: 0 })
        router.push('/login')
      }
    });

    return () => unsubscribe()
  }, [category]);

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
          <div className="profile absolute top-12 md:top-24 left-2 md:left-12 rounded-full md:h-[139px] md:w-[139px]">
            <Image
              src={user?.profilePhoto ? user.profilePhoto : "/blankPicture.png"}
              alt="Empty profile pict"
              width={100}
              height={100}
              className="bg-white md:w-[139px] md:h-[139px] object-cover border-2 border-white rounded-full"
            />
            <ImageProfileEdit setUser={setUser} />
          </div>
          <div className="relative flex justify-between w-[210px] md:w-[320px] max-md:top-24 ml-28  md:ml-[200px] md:-bottom-[160px]">
            <div>
              <p className="font-semibold md:text-[30px]">
                {user?.username ? user.username : "Nama Anda"}
              </p>
              <p className="max-md:text-xs">{user?.title ? user.title : "Meow Engineer"}</p>
            </div>

            <Dropdown />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-6 relative max-md:h-16 gap-2 md:gap-4 max-md:top-28 md:-bottom-[195px] md:py-[3px]">
        <div className="flex w-full justify-center  md:px-20 py-2 rounded-full gap-6 md:gap-24 m-auto bg-[#E0F4FF]">
          <div className="text-center">
            <p className="text-black font-bold md:text-2xl">{postCounts.image}</p>
            <p className="text-gray-600">Image</p>
          </div>
          <div className="text-center">
            <p className="text-black font-bold md:text-2xl">{postCounts.video}</p>
            <p className="text-gray-600">Video</p>
          </div>
          <div className="text-center">
            <p className="text-black font-bold md:text-2xl">{postCounts.blog}</p>
            <p className="text-gray-600">Blog</p>
          </div>
        </div>

        <section className="description w-full flex px-6 md:px-9 py-2 md:py-[19.5px] rounded-[25px] bg-[#E0F4FF] leading-[22.5px] text-xs md:text-[15px] tracking-[5%]">
          <p className="flex text-center">
            {user?.description ? user.description : "Deskripsi akun akan ada diisni dan akan panjang tetapi tetap di dalam kotak ini agar membatasi dan kotaknya tidak akan terlihat saat sudah ada ini dan jangan lupa gunakan pembatas huruf ya"}
          </p>
        </section>


        <ButtonSwitchPost category={category} setCategory={setCategory} />
      </div>



      <section className='absolute bottom-28 w-[537px] h-[320px] md:h-[350px] overflow-y-auto scrollbar-hide'>
        {category === "image" && <ImageLayout posts={posts} />}
        {category === "video" && <VideoLayout posts={posts} />}
        {category === "blog" && <BlogLayout posts={posts} />}
      </section>

      <AddPostButton />

    </>
  );
}
