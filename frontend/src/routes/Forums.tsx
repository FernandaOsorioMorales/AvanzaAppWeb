import axios from "axios";
import { Field, Formik, Form } from 'formik';
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProtectedRoute from "../components/protectedRoute.tsx";
import { SidebarTrainer } from "../components/SideBar/SidebarTrainer.tsx";

type forum = {id: number, topic: string};

export default function Forums() {
	const [forums, setForums] = useState([]);

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

	const forumCards = forums.map(forum => <ForumCard key={forum.id} forum={forum} />);

	return (
		<>
			<ProtectedRoute kindsAllowed={["trainer"]} />
			<div className="flex flex-row bg-[#E9F9FF] min-h-screen">
    <div><SidebarTrainer /></div>
    <div className="flex-grow p-8">
        <h1 className="text-6xl text-center text-rose-700 font-semibold mb-8">¡Bienvenido a tus foros!</h1>
        <div className="flex flex-row">
            <div className="w-1/2">
                <ul>
                    {forumCards}
                </ul>
            </div>
            <div className="w-1/2 pl-8">
                <h2 className="text-2xl text-rose-700 font-semibold mb-4">Comienza a compartir lo que piensas</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ForumCreator />
                </div>
            </div>
        </div>
    </div>
</div>
		</>
	);
}

function ForumCard({ forum }) {
    return (
        <li className="card shadow-lg bg-white m-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            <div className="card-body flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold text-azulF px-4">{forum.topic}</h2>
                <a href={`/forum/${forum.id}`} className="btn bg-azulote text-white py-2 px-6 rounded-lg mr-4 hover:bg-azulote-dark">Ver</a>
            </div>
        </li>
    );
}

function ForumCreator() {
	const [forumTopic, setForumTopic] = useState("");

	function saveForum(topic) {
		axios({
			data: qs.stringify({ topic }),
			method:"post",
			url: "/api/forum",
			withCredentials: true
		})
		.then(_ => toast("Creado exitosamente"))
		.catch(err => toast(`Hubo un problema: ${err}`));
	}

	return (
		<div className="card shadow-xl p-6 my-4 bg-vainilla rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-azulF">Crea un nuevo foro</h2>
    <Formik
        initialValues={{ topic: forumTopic }}
        onSubmit={(values) => {
            saveForum(values.topic);
            setForumTopic("");
        }}
    >
        {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="topic"
                        className="input input-bordered w-full py-2 px-3 rounded-lg"
                        placeholder="Ingrese el tema del foro"
                        value={values.topic}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn bg-azulote text-white py-2 px-6 rounded-lg"
                >
                    Crear foro
                </button>
            </form>
        )}
    </Formik>
</div>
	);
}