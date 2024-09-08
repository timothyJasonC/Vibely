'use server'
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { doc, setDoc, getDocs, query, where, collection, getDoc, DocumentData, updateDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { fireStore } from "@/firebase/config";

export const createPost = async (title: string, contentLink: string, contentText: string, postType: string, token: string) => {
    try {
        const data = verify(token, process.env.KEY_JWT!) as JwtPayload;
        const userId = data.userId

        const postRef = collection(fireStore, 'posts')
        let newPost = {}
        if (postType === 'blog') {
            newPost = {
                title,
                contentLink,
                contentText,
                postType,
                userId,
                createdAt: serverTimestamp()
            };
        } else {
            newPost = {
                title,
                contentLink,
                postType,
                userId,
                createdAt: serverTimestamp()
            };
        }

        await addDoc(postRef, newPost);

        return "Post created successfully";
    } catch (error) {
        console.error("Error creating post:", error);
        return "Something went wrong, please login again";
    }
}

export const getPostCountsByUser = async (token: string) => {
    const types = ['image', 'video', 'blog'];
    const counts: Record<string, number> = {};

    try {
        for (const type of types) {
            const posts = await getPostsByUser(token, type);
            counts[type] = posts.length;
        }
        return counts;
    } catch (error) {
        console.error("Error fetching post counts:", error);
        return "Something went wrong, please try again";
    }
}

export const getPostsByUser = async (token: string, postType?: string) => {
    try {
        const data = verify(token, process.env.KEY_JWT!) as JwtPayload;
        const userId = data.userId;

        const postRef = collection(fireStore, 'posts');

        let q;
        if (postType) {
            q = query(postRef, where("userId", "==", userId), where("postType", "==", postType));
        } else {
            q = query(postRef, where("userId", "==", userId));
        }

        const querySnapshot = await getDocs(q);
        
        const posts: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toMillis() });
        });

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return "Something went wrong, please try again";
    }
}

export const getPostById = async (postId: string) => {
    try {
      const postRef = doc(fireStore, 'posts', postId);
      const postSnap = await getDoc(postRef);
  
      if (postSnap.exists()) {
        const postData = postSnap.data();
  
        return {
          id: postSnap.id,
          ...postData,
          createdAt: postData.createdAt.toMillis(),
        };
      } else {
        return "Post not found";
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      return "Something went wrong, please try again";
    }
  };