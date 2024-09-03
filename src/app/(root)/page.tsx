"use client";
import ButtonSwitchPost from "@/components/ButtonSwitchPost";
import LogoutButton from "@/components/LogoutButton";
import { getUserCredentials } from "@/database/actions/user.action";
import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const authToken = Cookie.get("auth_token");
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [activeTab, setActiveTab] = useState("image");

  const getUser = async () => {
    if (authToken) {
      const user = await getUserCredentials(authToken!);
      if (user === "Something went wrong please login again") {
        toast.error(user);
        router.push("/login");
      } else {
        setUser(user);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

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
      <ButtonSwitchPost />
    </>
  );
}
