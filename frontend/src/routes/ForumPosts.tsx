import axios from "axios";
import { Field, Formik, Form } from 'formik';
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FirebaseImage from "../utils/FirebaseImage.tsx";
import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";

type Post = {id: number, title: string, authorAlias: string, authorPhoto: string, commentCount: number, likeCount: number};

function postCard(post: Post) {
	return (
		<li key={post.id} className="card shadow-lg bg-white m-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
    <a href={`/post/${post.id}`} className="block">
        <div className="card-body flex flex-row items-center text-md">
            <div className="flex items-center">
                <FirebaseImage image_name={post.authorPhoto} className="rounded-full h-12 w-12 mr-4" />
                <p className="font-semibold text-verde">{post.authorAlias}</p>
            </div>
            <h2 className="flex-grow text-xl font-semibold text-left pl-4 text-rose-700">{post.title}</h2>
            <div className="flex items-center">
                <div className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M15 14H3l6 6 6-6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-500">{post.commentCount}</span>
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v10a2 2 0 002 2h3v4l7-5H6a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-500">{post.likeCount}</span>
                </div>
            </div>
        </div>
    </a>
</li>
	);
}

function PostEditor(props: {forumId: string}) {
	const [post, setPost] = useState({title: "", content: "", forum: props.forumId})

	function savePost(data) {
		axios({
			data: qs.stringify(data),
			method: "post",
			url: "/api/post",
			withCredentials: true
		})
		.then(_ => toast("Post creado"))
		.catch(err => toast(`Hubo un problema: ${err}`));
	}

	return (
		<div className="card shadow-xl p-4 my-2 bg-vainilla">
    <h2 className="text-3xl mb-4 text-rose-700 font-semibold">Crear un post</h2>
    <Formik initialValues={post} onSubmit={savePost}>
        {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        className="input input-bordered w-full py-2 px-3 rounded-lg"
                        placeholder="Título del post"
                        value={values.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="content"
                        className="textarea textarea-bordered w-full py-2 px-3 rounded-lg"
                        placeholder="Contenido del post"
                        value={values.content}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn bg-azulote text-white py-2 px-6 rounded-lg"
                >
                    Crear post
                </button>
            </form>
        )}
    </Formik>
</div>
	);
}

export default function ForumPosts() {
	const params = useParams();
	const [forum, setForum] = useState({id: -1, topic: ""});
	const [posts, setPosts] = useState(new Array<Post>());
	const [sortByLikes, setSortByLikes] = useState(true);

	useEffect(fetchForum, [])
	function fetchForum() {
		axios({
			method: "get",
			url: `/api/forum/${params.forumId}`,
			withCredentials: true
		})
		.then(res => {
			const data = res?.data;

			setForum(data?.forum);
			setPosts(data?.posts);
		})
		.catch(e => toast(e));
	}

	let sortfn;
	if (sortByLikes) {
		console.log("yas");
		sortfn = (a:Post, b:Post) => b.likeCount - a.likeCount;
	} else {
		sortfn = (a:Post, b:Post) => b.id - a.id;
	}

	const postCards = posts.toSorted(sortfn).map(postCard);

	return (
	<>
		<ProtectedRoute kindsAllowed={["trainer"]}/>

		<div className="flex flex-row bg-blue-50">
    <div><SidebarTrainer /></div>
    <div className="flex-grow p-8">
        <h1 className="text-4xl text-center text-blue-700 font-semibold">{forum.topic}</h1>
        <div className="flex flex-row">
            <div className="w-1/2">
                <ul>
                    {postCards}
                </ul>
            </div>
            <div className="w-1/2 pl-8">
                <PostEditor forumId={params.forumId}/>
               
            </div>
        </div>
    </div>
</div>
	</>
	);
}
