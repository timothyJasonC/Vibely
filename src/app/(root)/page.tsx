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
import Cookie from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddPostButton from "@/components/AddPostButton";
import { getPostCountsByUser, getPostsByUser } from "@/database/actions/post.action";

export default function Home() {
  const router = useRouter()
  const [category, setCategory] = useState<TabType>("image");
  const authToken = Cookie.get('auth_token');
  const [user, setUser] = useState<UserParams | DocumentData>()
  const [posts, setPosts] = useState<DocumentData[] | string>([]);
  const [postCounts, setPostCounts] = useState<Record<string, number>>({ image: 0, video: 0, blog: 0 });
  const [animationSetting, setAnimationSetting] = useState<Boolean>(false);


  const getUser = async () => {
    if (authToken) {
      const userData = await getUserCredentials(authToken!);
      if (userData === "Something went wrong please login again") {
        toast.error(userData);
        router.push('/login');
      } else {
        setUser(userData);

        const counts = await getPostCountsByUser(authToken!);
        if (typeof counts === 'object') {
          setPostCounts(counts);
        } else {
          toast.error(counts);
        }

        const postsData = await getPostsByUser(authToken!, category);
        setPosts(postsData);
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [category]);


  const changeImage = () => {
    console.log("ok");
  };
  useEffect(() => {
    // Memastikan bahwa GIF hanya dimuat ulang ketika animationSetting berubah
    console.log("Animation setting updated:", animationSetting);
  }, [animationSetting]);
  return (
    <>
      <DropdownMenu>
        {animationSetting ? (
          <DropdownMenuTrigger
            className="absolute top-[200px] ml-[485px] cursor-pointer"
            asChild
            onClick={() => setAnimationSetting(!animationSetting)}
            style={{ zIndex: 1000 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              className=""
            >
              <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
            </svg>
          </DropdownMenuTrigger>
        ) : (
          <DropdownMenuTrigger
            className="absolute top-[200px] ml-[485px] cursor-pointer"
            asChild
            onClick={() => setAnimationSetting(!animationSetting)}
            style={{ zIndex: 1000 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              className="animate-spin-smooth"
            >
              <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
            </svg>
          </DropdownMenuTrigger>
        )}

        <DropdownMenuContent className=" absolute">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="my-5">
            {" "}
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex flex-wrap relative">
        <div className="Cover ">
          <Image
            width={535}
            height={145}
            alt="Pemandangan"
            src="/cover.jpg"
            className="absolute"
          />
          <div className="profile absolute top-24 left-12 rounded-full h-[139px] w-[139px]">
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
            <p className="font-semibold text-[30px]">
              {user?.username ? user.username : "Nama Anda"}
            </p>
            <p className="">{user?.title ? user.title : "Meow Engineer"}</p>
          </div>
        </div>
      </div>
      <div className="total-post flex items-center relative gap-16 bg-[#E0F4FF] m-auto -bottom-[195px] px-10 rounded-[25px] w-[444px]  py-[3px]">
        <div className="flex gap-16 m-auto">
          <div className="text-center">
            <p className="text-black font-bold text-2xl">{postCounts.image}</p>
            <p className="text-gray-600">Image</p>
          </div>
          <div className="text-center">
            <p className="text-black font-bold text-2xl">{postCounts.video}</p>
            <p className="text-gray-600">Video</p>
          </div>
          <div className="text-center">
            <p className="text-black font-bold text-2xl">{postCounts.blog}</p>
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
        {category === "image" && <ImageLayout  posts={posts}/>}
        {category === "video" && <VideoLayout posts={posts}/>}
        {category === "blog" && <BlogLayout posts={posts}/>}
      </section>

      <AddPostButton />

    </>
  );
}
