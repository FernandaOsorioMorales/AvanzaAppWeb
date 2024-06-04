import axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import FirebaseImage from "../../utils/FirebaseImage.tsx";

function resolveRequest(athlete_id: number, request_status: string) {
	if (request_status != "accepted" && request_status != "denied")
		throw "Invalid status";

	const data = {
		athlete_id: athlete_id,
		status: request_status 
	};
	axios({
		method: "patch",
		withCredentials: true,
		url: "/api/resolveRequest",
		data: qs.stringify(data)
	}).then(res => {
		toast("Éxito");
	}).catch(_ => {
		toast("No se pudo registrar cambio.");
	});
}

function RequestCard(request: {
	status: string,
	alias: string,
	description: string,
	athlete_id: number,
	photo: string,
}) {
	if (request.status === "denied") return null;

	let status_color, action, status_text;
	if (request.status === "accepted") {
		status_color = "bg-green-100";
		status_text = "Aceptado";
		action = (<button className="btn btn-disabled place-self-end text-lg p-2 glass" disabled>Aceptado</button>);
	} else if (request.status === "waiting") {
		status_color = "bg-yellow-100";
		status_text = "En espera";
		action = (
			<div className="flex space-x-2">
				<button className="btn btn-success text-lg p-2 glass" onClick={() => resolveRequest(request.athlete_id, "accepted")}>Aceptar</button>
				<button className="btn btn-error text-lg p-2 glass" onClick={() => resolveRequest(request.athlete_id, "denied")}>Negar</button>
			</div>
		);
	}

	return (
		<li key={request.athlete_id} className={`card card-compact shadow-md my-4 py-4 mx-auto rounded-lg transition-transform transform hover:scale-105 ${status_color}`} style={{ maxWidth: '100%' }}>
			<div className="card-body flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
				<FirebaseImage image_name={request.photo} className="rounded-full h-[10vh] w-[10vh] border-2 border-gray-300"/>
				<div className="flex-grow text-center sm:text-left">
					<h4 className="card-title text-xl font-semibold">{request.alias}</h4>
					<p className="text-base text-gray-700">{request.description}</p>
					<p className="text-sm text-gray-500 italic">{status_text}</p>
				</div>
				{action}
			</div>
		</li>
	);
}

function RequestsForTrainers() {
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			withCredentials: true,
			url: "/api/trainerRequests"
		}).then(res => {
			const data = res?.data;
			setRequests(data);
		})
	}, []);

	const request_cards = requests.map(RequestCard);

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm py-4">
				<div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold text-slate-800">Entrenador</h1>
					<nav>
						<ul className="flex space-x-2 sm:space-x-4">
						
							<li><a href="/editTrainerProfile" className="text-slate-600 hover:text-slate-800">Mi perfil</a></li>
						</ul>
					</nav>
				</div>
			</header>
			<main className="container mx-auto p-4 sm:p-6 lg:p-8">
				<h2 className="text-2xl sm:text-3xl text-slate-800 font-semibold text-center mb-4 sm:mb-6">¡Quiero que me entrenes!</h2>
				<ul className="space-y-4 ">
					{request_cards}
				</ul>
			</main>
		</div>
	);
}

export default RequestsForTrainers;

