"use client"; // Jangan lupa tambahkan "use client" di bagian atas file
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog"; // Import komponen AlertDialog
import PostContent from "./PostContent";
import { Textarea } from "@/components/ui/textarea"
import { createPost } from "@/database/actions/post.action";
import Cookie from 'js-cookie';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = (postType: string) =>
    z.object({
        title: z.string().min(10, { message: "Title must be at least 10 characters long." }).max(50, { message: "Title must be at most 50 characters long." }),
        contentLink: postType === "blog"
            ? z.string().nonempty({ message: "Content link is required." })
            : postType === "video"
                ? z.string()
                : z.string(),
        contentText: postType === "blog"
            ? z.string().min(100, { message: "Content text must be at least 100 characters long." })
            : z.string(),
    });


export default function PostForm({
    closeDialog,
    postType,
}: {
    closeDialog: () => void;
    postType: string;
}) {
    const authToken = Cookie.get('auth_token');
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema(postType)),
        defaultValues: {
            title: "",
            contentLink: "",
            contentText: "",
        },
        mode: "all",
    });

    async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
        await createPost(values.title, values.contentLink, values.contentText, postType, authToken!)
        toast.success('Post created successfully')
        router.push('/')
        closeDialog();
    }
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-primary-50"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan Judul Disini"
                                    className="placeholder:font-extralight"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contentLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PostContent postType={postType} onFieldChange={field.onChange} imageUrl={field.value} setLoading={setLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {postType === "blog" && (
                    <FormField
                        control={form.control}
                        name="contentText"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Masukkan text Disini"
                                        className="placeholder:font-extralight"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} className="disabled:bg-main disabled:text-black" onClick={form.handleSubmit(onSubmit)}>
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </form>
        </Form>
    );
}
