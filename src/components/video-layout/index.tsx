import { DocumentData } from "firebase/firestore";
import Link from "next/link";

interface ImageLayoutProps {
    posts: DocumentData[] | string;
}

export default function VideoLayout({ posts }: ImageLayoutProps) {
    return (
        <div className="video-gallery mt-10 mx-4 flex flex-col gap-4">
            {typeof posts !== 'string' && posts.map((video: any) => (
                <Link key={video.id} href={`/post/${video.id}`}>
                    <video key={video.id} controls src={video.contentLink} className="w-full h-28 rounded-2xl bg-gray-300 object-cover"></video>
                </Link>
            ))}
        </div>
    )
}