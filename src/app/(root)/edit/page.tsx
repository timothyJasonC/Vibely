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

            <section className='absolute rounded-2xl flex flex-col bottom-12 mx-auto right-2 left-2 pt-6 px-6 w-[444px] h-[650px] bg-primary-50'>
                <h1 className='text-2xl font-semibold mb-2'>Edit Profile</h1>
                <EditProfileForm provider={provider} user={user!} />
            </section>
        </div>
    )
}
