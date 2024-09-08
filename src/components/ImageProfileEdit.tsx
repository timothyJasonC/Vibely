import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { useState } from "react";
import Image from "next/image";
import Cookie from 'js-cookie';
import {uploadImage} from "@/firebase/uploaderImage";
import { UpdateImageProfile } from "@/database/actions/user.action";
import { UserParams } from "@/types";
import { DocumentData } from "firebase/firestore";
import { toast } from "sonner"

interface ImageProfileEditProps {
    setUser: React.Dispatch<React.SetStateAction<UserParams | DocumentData | undefined>>;
}


export default function ImageProfileEdit({ setUser }: ImageProfileEditProps) {

    const [previewImage, setPreviewImage] = useState<string | undefined>('');

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileData = reader.result as string;
                setPreviewImage(fileData);
            };
            reader.readAsDataURL(file);
        }
    }

    function removePhoto() {
        setPreviewImage(undefined);
    }

    async function handleSaveImage() {
        const authToken = Cookie.get('auth_token');
        if (!authToken) {
            console.error('Auth token not found');
            return;
        }

        if (previewImage) {
            try {
                const url = await uploadImage(previewImage, 'profile-images');
                await UpdateImageProfile(authToken, url);
                setUser((prevUser: any) => ({
                    ...prevUser,
                    profilePhoto: url,
                }));
                toast.success('Update Profile Image Success')
            } catch (error: any) {
                toast.error(error.message)
            }
        } else {
            toast.error('No image to upload');
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='absolute text-white text-xl font-extrabold rounded-full inset-0 top-0 hover:opacity-100 hover:cursor-pointer opacity-0 h-[139px] w-[139px] border-white transition-opacity duration-300 flex justify-center items-center bg-gray-400 bg-opacity-50 z-20'>Change</AlertDialogTrigger>
            <AlertDialogContent className="text-center items-center flex flex-col max-w-xs">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center pt-4">Edit Your Profile Image Here!</AlertDialogTitle>
                    <AlertDialogDescription>
                        <label className="flex flex-col h-32 gap-1 w-32 mx-auto border rounded-full bg-transparent text-xl whitespace-nowrap text-gray-600">
                            {previewImage ? (
                                <Image src={previewImage} width={100} height={100} alt="Uploaded" className="w-32 h-32 object-cover rounded-full" />
                            ) : (
                                <Image src={"/blankPicture.png"} width={100} height={100} alt="" className="w-32 h-32 object-cover rounded-full" />
                            )}
                        </label>
                        <div className="flex justify-between w-32 mx-auto mt-2">
                            {previewImage ? (
                                <button className="cursor-pointer border rounded-full p-2" onClick={removePhoto}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            ) : (
                                <label className="cursor-pointer border rounded-full p-2">
                                    <input type="file" accept="image/*" onChange={handleFileChange} name="file" className="hidden" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                    </svg>
                                </label>
                            )}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveImage}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
