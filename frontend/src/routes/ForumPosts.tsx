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
	<li key={post.id} className="card shadow-lg bg-slate-100 m-4">
		<a href={`/post/${post.id}`}> 
			<div className="card-body flex flex-row items-center text-md">
				<div>
					<FirebaseImage image_name={post.authorPhoto} className="rounded-full h-[10vh] w-[10vh]"/>
					{post.authorAlias}
				</div>

				<h2 className="card-title pl-4 flex-grow text-left text-2xl">{post.title}</h2>
				Comentarios: {post.commentCount}
				<br />
				Likes: {post.likeCount}
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
		<div className="card shadow-xl p-2">
			<h2 className="text-xl mb-4">Crear un post</h2>
			<Formik initialValues={post} onSubmit={savePost}>
				<Form>
					<Field type="text" name="title" className="input input-bordered mb-4" />
					<Field type="textarea" name="content" as="textarea" className="textarea textarea-bordered w-full mb-4" />
					<button type="submit" className="btn glass">Crear post</button>
				</Form>
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

			<div className="flex-grow">
				<h1 className="text-6xl text-center">{forum.topic}</h1>
				<div className="flex flex-row">
					<ul className="w-1/2">
						{postCards}
					</ul>
					<div className="w-1/2">
						<PostEditor forumId={params.forumId!}/>

						<div className="shadow-lg bg-slate-100 my-4 rounded-lg p-4">
							<label>
								Ordenar por likes ?
								<input type="checkbox" className="checkbox bg-slate-400 checked:bg-indigo-400" onChange={ev =>setSortByLikes(ev.target.checked)}/>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
	);
}
