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

function LikeButton(props: {id: string}) {
	const id = props.id;
	const [isToggled, setIsToggled] = useState(false);

	useEffect(get_post_like, []);
	function get_post_like() {
		axios({
			method: "get",
			url: `/api/post/${id}/like`,
			withCredentials: true,
		})
		.then(res => {
			const like_state = res?.data?.like;
			setIsToggled(like_state);
		})
		.catch(_ => toast("Error al recuperar datos"));
	}

	function set_post_like() {
		axios({
			method: "post",
			url: `/api/post/${id}/like`,
			withCredentials: true,
		})
		.then(res => {
			const like_state = res?.data?.like;
			setIsToggled(like_state);
		})
		.catch(_ => toast("Hubo un error al registrar el comentario"));
	}

	let like_color: string;
	if (isToggled) {
		like_color = "bg-indigo-500";
	} else {
		like_color = "bg-slate-100";
	}

	return (
		<button className={`btn glass ${like_color} ml-auto`} onClick={set_post_like}>
		Like
		</button>
	);
}

function ContentBox(props: {post: Post, postId: string}) {
	const post = props.post;
	const postId = props.postId;

	return (
	<div className="p-2 rounded shadow-2xl mb-4 p-2">
		<h1 className="text-4xl text-center">{post.title}</h1>
		<div className="flex flex-row items-center pb-2 text-2xl">
			<FirebaseImage image_name={post.authorPhoto} className="w-[12vh] h-[12vh] rounded-full overflow-hidden mr-4" />
			{post.authorAlias}
			<LikeButton id={postId}/>
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
				<ContentBox postId={params.postId!} post={post}/>
				<CommentBox postId={params.postId!} />
				<PostComments comments={comments}/>
			</div>
		</div>
	</>
	);
}
