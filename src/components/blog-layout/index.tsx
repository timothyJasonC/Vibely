import { DocumentData } from "firebase/firestore";
import Link from "next/link";

interface ImageLayoutProps {
    posts: DocumentData[] | string;
}


export default function BlogLayout({ posts }: ImageLayoutProps) {
    return (
        <div className="blog-gallery w-[300px] md:w-[500px] mt-10 mx-4 grid grid-cols-2 gap-4">
            {typeof posts !== 'string' && posts.map((blog) => (
                <Link key={blog.id} href={`/post/${blog.id}`}>
                    <img src={blog.contentLink} alt="thumbnail" className="w-full h-28 object-cover rounded-2xl bg-gray-300" />
                </Link>
            ))}
        </div>
    )
}