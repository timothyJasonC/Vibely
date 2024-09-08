'use client'
import NotFound from '@/components/NotFound';
import { Button } from '@/components/ui/button';
import { getPostById } from '@/database/actions/post.action';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface PageProps {
    params: {
        id: string
    }
}

export default function page({ params: { id } }: PageProps) {
    const [post, setPost] = useState<DocumentData | null>(null)
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPostById(id)
            if (typeof postData === "string") {
                console.error(postData);
                setNotFound(true);
            } else {
                setPost(postData)
            }
        };
        fetchPost();
    }, [id]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link berhasil disalin ke clipboard!');
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    if (notFound) return <NotFound />

    return (
        <div className="flex h-full flex-wrap relative">
            <div className='w-full h-full absolute bg-gray-500 opacity-30 z-10'></div>
            <Image
                width={535}
                height={145}
                alt="Pemandangan"
                src="/cover.jpg"
                className="absolute"
            />
            <div className='p-12 py-12 mx-auto z-20 relative'>
                <Image
                    width={535}
                    height={145}
                    alt="Pemandangan"
                    src="/cover-post.png"
                    className='bg-primary-50 rounded-t-3xl border-0'
                />
                <div className='bg-primary-50 flex flex-col gap-2 p-4 h-[700px] pb-20 rounded-b-3xl'>
                    <p className='font-extralight text-sm'>
                        {post ? new Date(post.createdAt).toLocaleDateString() : 'Tanggal tidak ditemukan'}
                    </p>
                    <h1 className='text-3xl font-bold tracking-wider'>{post ? post.title : 'Title tidak ditemukan'}</h1>
                    {post?.postType !== 'video' ? (
                        <Image
                            width={200}
                            height={200}
                            src={post?.contentLink || '/cover.jpg'}
                            alt='content'
                            className={`w-full ${post?.postType !== 'blog' ? 'h-full' : 'h-44'} object-cover items-center`}
                        />
                    ) : (
                        <video controls src={post?.contentLink} className="w-full h-[500px] rounded-2xl bg-gray-300"></video>
                    )}
                    <p className='w-[300px] h-64 font-light'>{post ? post.contentText : 'Konten tidak ditemukan'}</p>
                </div>
                <Button onClick={handleCopyLink} className='absolute bottom-20 right-20'>Share</Button>
            </div>
        </div>
    )
}
