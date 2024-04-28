import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RequestCard(request: {
	status: string,
	alias: string,
	description: string,
	trainer_id: number,
	photo: string,
}) {

	let status_color, status_message;
	if (request.status === "accepted") {
		status_color = "bg-verde";
		status_message = "Aceptado";
	} else if (request.status === "denied") {
		status_color = "bg-rojito";
		status_message = "Negado"
	} else if (request.status === "waiting") {
		status_color = "bg-vainilla";
		status_message = "En espera"
	}

	return (
	<li key={request.trainer_id} className={"card card-compact shadow-md my-4 py-4 w-3/4 " + status_color}>
		<div className="card-body flex flex-row ">
			<div className="flex-grow">
				<h4 className="card-title">{request.alias}</h4>
				<p className="text-base">{request.description}</p>
			</div>
			<h4 className="text-lg rounded-box p-2 shadow-inner bg-azulClarito place-self-end">{status_message}</h4>
		</div>
	</li>
	)
}

function ShowRequests() {

	const [requests, setRequests] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			withCredentials: true,
			url: "/api/athleteRequests"
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

export default ShowRequests;

