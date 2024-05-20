import axios from "axios";
import { Field, Formik, Form } from 'formik';
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";

type forum = {id: number, topic: string};

function ForumCard(f: forum) {
	return (
	<li key={f.id} className="card shadow-lg bg-slate-100 m-4">
		<div className="card-body flex flex-row">
			<h2 className="card-title pl-4">{f.topic}</h2>
			<a href={`/forum/${f.id}`} className="btn flex-grow ">Ver</a>
		</div>
	</li>
	);
}

function ForumCreator() {
	const [forumTopic, setForumTopic] = useState({topic: ""});

	function saveForum(data: {topic: string}) {
		axios({
			data: qs.stringify(data),
			method:"post",
			url: "/api/forum",
			withCredentials: true
		})
		.then(_ => toast("Creado exitosamente"))
		.catch(err => toast(`Hubo un problema: ${err}`));
	}

	return (
		<div className="card shadow-xl p-4 my-2">
			<h2 className="text-xl mb-4">Crea un nuevo foro</h2>
			<Formik initialValues={forumTopic} onSubmit={saveForum}>
				<Form>
					<Field type="text" name="topic" className="input input-bordered mb-4" />
					<button type="submit" className="btn glass">Crear foro!</button>
				</Form>
			</Formik>
		</div>
	);
}

// The list of all available trainer forums
export default function Forums() {
	const [forums, setForums] = useState(new Array<forum>());

	useEffect(fetchForums, []);
	function fetchForums() {
		axios({
			method: "get",
			url: "/api/forum",
			withCredentials: true,
		})
		.then(res => {
			const forums = res?.data;
			setForums(forums);
		})
		.catch(_ => {
			toast("No se pudieron obtener los foros");
		})
	}

	const forumCards = forums.map(ForumCard);
	return (
	<>
		<ProtectedRoute kindsAllowed={["trainer"]}/>
		<div className="flex flex-row bg-blue-50">
			<div><SidebarTrainer /></div>
			<div className="flex-grow">
				<h1 className="text-6xl text-center">Forums</h1>

				<div className="flex flex-row">
					<ul className="w-1/2">
						{forumCards}
					</ul>
					<div className="w-1/2">
						<ForumCreator />
					</div>
				</div>
			</div>
		</div>
	</>
	);
}
