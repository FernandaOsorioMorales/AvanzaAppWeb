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

	if (request.status === "denied")
		return null;

	let status_color, action;
	if (request.status === "accepted") {
		status_color = "bg-verde";
		action = ( <button className="btn place-self-end text-lg p-2 glass" disabled>Aceptado</button>);
	} else if (request.status === "waiting") {
		status_color = "bg-vainilla";
		action = (
		<>
			<button className="btn place-self-end text-lg p-2 glass" onClick={() => resolveRequest(request.athlete_id, "accepted")}>Aceptar</button>
			<button className="btn place-self-end text-lg p-2 glass" onClick={() => resolveRequest(request.athlete_id, "denied")}>Negar</button>
		</>
		);
	}

	return (
	<li key={request.athlete_id} className={"card card-compact shadow-md my-4 py-4 w-3/4 " + status_color}>
		<div className="card-body flex flex-row items-center">
			<FirebaseImage image_name={request.photo} className="rounded-full h-[10vh] w-[10vh]"/>
			<div className="flex-grow">
				<h4 className="card-title">{request.alias}</h4>
				<p className="text-base">{request.description}</p>
			</div>
			{action}
		</div>
	</li>
	)
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
	<>
		<h2 className="text-2xl text-slate-800 font-semibold p-4"> Solicitudes: </h2>
		<ul className="px-4 text-slate-800 mx-auto">
		{request_cards}
		</ul>
	</>
	)
}

export default RequestsForTrainers;

