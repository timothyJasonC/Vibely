'use client'
import LogoutButton from '@/components/LogoutButton';
import { getUserCredentials } from '@/database/actions/user.action';
import Cookie from 'js-cookie';
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
    <div className="">
      <LogoutButton />
    </div>
  );
}
