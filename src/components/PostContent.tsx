"use client";

import { deleteImage, uploadImage } from '@/firebase/uploaderImage';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type FileUploaderProps = {
    onFieldChange: (url: string) => void;
    imageUrl: string;
    postType: string;
    setLoading: (stat: boolean) => void
};

export default function PostContent({ imageUrl, onFieldChange, postType, setLoading }: FileUploaderProps) {
    const [preview, setPreview] = useState<string | undefined>(imageUrl);

    useEffect(() => {
        setPreview(imageUrl);
    }, [imageUrl]);

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLoading(true)
                const fileData = reader.result as string;
                setPreview(fileData);

                const uploadPath = postType === "video" ? "post-videos" : "post-images";

                uploadImage(fileData, uploadPath)
                    .then((url) => {
                        onFieldChange(url);
                        toast.success(`${postType === 'video' ? 'video' : 'image'} uploaded successfully`);
                        setLoading(false)
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            };
            reader.readAsDataURL(file);
        }
    }

    function removeFile() {
        setPreview(undefined);
        deleteImage(imageUrl)
            .then(() => {
                onFieldChange("");
                toast.success("File deleted successfully");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <div>
            <div className="flex-center bg-dark-3 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
                {preview ? (
                    <div className="relative flex h-full w-full flex-1 justify-center ">
                        {postType === "video" ? (
                            <video
                                src={preview}
                                controls
                                width={100}
                                height={100}
                                className="w-full h-[250px] object-cover object-center"
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="image"
                                width={100}
                                height={100}
                                className="w-full h-[250px] object-cover object-center"
                            />
                        )}
                        <button onClick={removeFile} className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 rounded-2xl p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="flex-center flex-col p-2 bg-white text-grey-500">
                        <div className='border-2 border-dashed border-black py-6  flex flex-col items-center justify-center'>
                            <label>
                                <img src={`${postType === 'video' ? '/img/button/LayoutVideo.png' : '/img/button/LayoutImage.svg'}`} width={100} height={210} alt="file upload" className='cursor-pointer' />
                                <input
                                    type="file"
                                    accept={postType === "video" ? "video/mp4" : "img/*"}
                                    onChange={handleFileChange}
                                    name="file"
                                    className="hidden"
                                />
                            </label>
                            <p className="p-medium-12 mb-4">
                                {postType === "video" ? "Upload your Video (MP4)" : "Upload your Image (JPG/PNG)"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
