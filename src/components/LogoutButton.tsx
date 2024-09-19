"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {

    signOut(auth);
    toast.success("Logout successful");

    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className="text-red-500"
      role="menuitem"
      tabIndex={-1}
      id="menu-item-1">
      Logout
    </button>
  );
};

export default LogoutButton;
