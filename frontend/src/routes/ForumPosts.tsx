import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FirebaseImage from "../utils/FirebaseImage.tsx";
import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";

type Post = {id: number, title: string, authorAlias: string, authorPhoto: string, commentCount: number};
type Forum = {id:number, topic: string};

function postCard(post: Post) {
	return (
	<li key={post.id} className="card w-1/2 shadow-lg bg-slate-100 m-4">
		<a href={`/post/${post.id}`}> 
			<div className="card-body flex flex-row items-center text-md">
				<div>
					<FirebaseImage image_name={post.authorPhoto} className="rounded-full h-[10vh] w-[10vh]"/>
					{post.authorAlias}
				</div>

				<h2 className="card-title pl-4 flex-grow text-left text-2xl">{post.title}</h2>
				Comentarios: {post.commentCount}
			</div>
		</a>
	</li>
	);
}

export default function ForumPosts() {
	const params = useParams();
	const [forum, setForum] = useState({id: -1, topic: ""});
	const [posts, setPosts] = useState(new Array<Post>());

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


	const postCards = posts.map(postCard);

	return (
	<>
		<ProtectedRoute kindsAllowed={["trainer"]}/>

		<div className="flex flex-row bg-blue-50">
			<div><SidebarTrainer /></div>

			<div className="flex-grow">
			<h1 className="text-6xl text-center">{forum.topic}</h1>
			<ul>
			</ul>
				{postCards}
			</div>
		</div>
	</>
	);
}
