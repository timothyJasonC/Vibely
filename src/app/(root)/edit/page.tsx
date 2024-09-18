'use client'
import Image from 'next/image'
import { UserParams } from '@/types';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getUserCredentials } from '@/database/actions/user.action';
import ImageProfileEdit from '@/components/ImageProfileEdit';
import { auth } from '@/firebase/config';
import EditProfileForm from '@/components/EditProfileForm';
import Dropdown from '@/components/Dropdown';

export default function Page() {
    const router = useRouter()
    const [user, setUser] = useState<UserParams | DocumentData>()
    const [provider, setProvider] = useState('')
    const [loading, setLoading] = useState(true)

    const getUser = async () => {
        const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
            if (user?.uid) {
                const providerId = user.providerData[0]?.providerId;
                if (providerId === 'google.com') {
                    setProvider('google')
                } else if (providerId === 'password') {
                    setProvider('email')
                }
                try {
                    const userData = await getUserCredentials(user.uid);
                    setUser(userData);
                    setLoading(false)
                } catch (error) {
                    toast.error("Failed to fetch user data or posts.");
                }
            } else {
                setUser(undefined)
                router.push('/login')
            }
            return () => unsubscribe()
        })
    }

    useEffect(() => {
        getUser();
    }, [provider]);

    if (loading) {
        return <div>Loading...</div>;
    }

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

            <section className='absolute rounded-2xl flex flex-col max-md:top-40 md:bottom-12 mx-auto right-2 left-2 pt-2 md:pt-6 px-6 md:w-[444px] h-[600px] md:h-[650px] bg-primary-50'>
                <h1 className='text-xl md:text-2xl font-semibold mb-2'>Edit Profile</h1>
                <EditProfileForm provider={provider} user={user!} />
            </section>
        </div>
    )
}
