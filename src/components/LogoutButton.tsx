'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        const allCookies = Cookies.get();

        Object.keys(allCookies).forEach(cookieName => {
            Cookies.remove(cookieName);
        });

        toast.success('Logout successful');

        setTimeout(() => {
            router.push('/login');
        }, 1000);
    };

    return (
        <Button
            onClick={handleLogout}
            className="bg-red-500 mt-64 ml-32 text-white font-bold rounded-md"
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
