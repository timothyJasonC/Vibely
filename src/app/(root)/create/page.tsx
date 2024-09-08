'use client'
import Image from 'next/image'
import Cookie from 'js-cookie';
import { UserParams } from '@/types';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getUserCredentials } from '@/database/actions/user.action';
import ImageProfileEdit from '@/components/ImageProfileEdit';
import CreateIcon from '@/components/CreateIcon';


export default function page() {
  const router = useRouter()
  const authToken = Cookie.get('auth_token');
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
    getUser();
  }, []);
  return (
    <div className='w-full h-[955px] relative'>

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

      <section className='absolute rounded-2xl flex flex-col bottom-12 mx-auto right-2 left-2 pt-6 items-center w-[444px] h-[650px] bg-primary-50'>
          <CreateIcon/>
      </section>
    </div>
  )
}
