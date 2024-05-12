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

type Post = {id: number, title: string, content: string, authorAlias: string, authorPhoto: string };
type Comment = {id: number, content: string, authorAlias: string, authorPhoto: string};

function ContentBox(props: {post: Post}) {
	const post = props.post;
	return (

	<div className="p-2 rounded shadow-2xl mb-4 p-2">
		<h1 className="text-4xl text-center">{post.title}</h1>
		<div className="flex flex-row items-center pb-2 text-2xl">
			<FirebaseImage image_name={post.authorPhoto} className="w-[12vh] h-[12vh] rounded-full overflow-hidden mr-4" />
			{post.authorAlias}
		</div>
		{post.content}
	</div>
	);
}

function CommentBox(props: {postId: string}) {
	const [commentData, setCommentData] = useState({
		comment: ""
	});

	function saveComment(values) {
		// CURRENT: add postid to values you fool
		//console.log(values);
		//console.log(qs.stringify({post: props.postId, comment: values.comment}));
		axios({
			data: qs.stringify({post: props.postId, content: values.comment}),
			method: "post",
			url: "/api/comment",
			withCredentials: true,
		})
		.then(_ => toast("Comentario guardado"))
		.catch(e => toast(`Hubo un problema: ${e}`));
	}

	return (
	<Formik initialValues={commentData} onSubmit={saveComment}>
		<Form className="flex flex-row shadow-2xl p-2 rounded">
			<Field type="text" name="comment" className="flex-grow input input-bordered"/>
			<button type="submit" className="btn glass">Comentar</button>
		</Form>
	</Formik>
	);
}

function PostComments(props: {comments: Comment[]}) {
	const commentCards = props.comments.map(c => {
		return (
		<li key={c.id}>
			<FirebaseImage image_name={c.authorPhoto} className="w-[5vh] h-[5vh] rounded-full overflow-hidden" />
			{c.authorAlias}: {c.content}
			<hr />
		</li>
		);
	});

	return (
	<ul className="flex flex-col rounded shadow-2xl p-4 m-2">
		{commentCards}
	</ul>
	);
}

export default function Forum() {
	const params = useParams();
	const [post, setPost] = useState<Post>({id: -1, title:"", content:"", authorAlias:"", authorPhoto:""});
	const [comments, setComments] = useState(new Array<Comment>());

	useEffect(fetchPost, []);
	useEffect(fetchComments, []);

	function fetchPost() {
		axios({
			method: "get",
			url: `/api/post/${params.postId}`,
			withCredentials: true
		})
		.then(res => {
			const data = res?.data;
			setPost(data);
		})
		.catch(e => {
			toast(`Hubo un problema: ${e}`);
		})
	}

	function fetchComments() {
		axios({
			method: "get",
			url: `/api/post/${params.postId}/comments`,
			withCredentials: true
		})
		.then(res => {
			const data = res?.data;
			setComments(data);
		})
		.catch(e => toast(`Hubo un problema: ${e}`));
	}
	

	return (
	<>
		<ProtectedRoute kindsAllowed={["trainer"]}/>
		<div className="flex flex-row bg-blue-50">
			<div><SidebarTrainer /></div>

			<div className="flex-grow flex flex-col p-4 m-2">
				<ContentBox post={post}/>
				<CommentBox postId={params.postId!} />
				<PostComments comments={comments}/>
			</div>
		</div>
	</>
	);
}
