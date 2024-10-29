import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import Rating from "@/Components/Rating.jsx";
import { marked } from "marked";
import dayjs from "dayjs";

export default function MyPosts({ auth, posts }) {
    return (
        <Layout header={"My Posts"}>
            <Head title="My Posts" />
            <div className="container mx-auto py-8">
                <div className="flex flex-col items-center gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                            <h2 className="text-3xl font-bold mb-4 pb-4 border-b-2 border-gray-300">
                                {post.title}
                                {dayjs().diff(dayjs(post.created_at), 'hour') < 1 && (
                                    <span className="ml-2 text-sm text-gray-50 bg-gradient-to-r from-blue-300 to-blue-500 py-2 px-4 rounded-xl right-6 top-6 absolute">New!</span>
                                )}
                            </h2>
                            <div className="text-gray-700 max-h-40 overflow-hidden relative">
                                <div
                                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-white z-20 pointer-events-none"></div>
                                <div className="relative z-10"
                                     dangerouslySetInnerHTML={{__html: marked(post.content)}}></div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <Link href={`/posts/${post.id}`} className="text-indigo-500 hover:text-indigo-700">
                                    Read more
                                </Link>
                                <Rating auth={auth} postId={post.id} initialRating={post.rating} initialVote={post.user_rate}/>
                            </div>
                        </div>
                    ))}
                    <Link href={route('posts.create')} className="fixed right-0 bottom-0 mb-10 mr-10 text-gray-100 no-underline bg-blue-500 hover:bg-blue-600 duration-200 px-4 py-1.5 rounded-xl">
                        Create Post
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
