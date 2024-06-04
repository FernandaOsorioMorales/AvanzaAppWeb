import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RequestCard({ request }) {
	let status_color, status_message, chat_message;
	if (request.status === "accepted") {
	  status_color = "bg-green-200";
	  status_message = "Aceptado";
	  chat_message = "Puedes comenzar a comunicarte por el chat.";
	} else if (request.status === "denied") {
	  status_color = "bg-red-200";
	  status_message = "Negado";
	} else if (request.status === "waiting") {
	  status_color = "bg-yellow-200";
	  status_message = "En espera";
	}
  
	return (
	  <li key={request.trainer_id} className={"card card-compact shadow-md my-4 py-4 w-full md:w-3/4 " + status_color}>
		<div className="card-body flex flex-col md:flex-row justify-between items-start p-4">
		  <div className="flex-1">
			<h4 className="card-title text-xl font-semibold mb-1">{request.alias}</h4>
			<p className="text-base mb-2">{request.description}</p>
		  </div>
		  <div className="flex-shrink-1 text-right">
  			<div className="inline-block">
    			<h4 className="text-lg rounded-full p-2 shadow-inner bg-blue-200 mb-2">{status_message}</h4>
  			</div>
  				{request.status === "accepted" && (
    			<p className="text-sm text-green-700 md:text-base">{chat_message}</p>
  				)}
			</div>
		</div>
	  </li>
	);
  }
  
  function RequestsForAthletes() {
	const [requests, setRequests] = useState([]);
  
	useEffect(() => {
	  axios.get("/api/athleteRequests", { withCredentials: true })
		.then(res => {
		  const data = res?.data;
		  setRequests(data);
		})
		.catch(() => {
		  // Manejar errores si es necesario
		});
	}, []);
  
	return (
	  <>
		<h2 className="text-2xl text-slate-800 font-semibold p-4">Solicitudes:</h2>
		<ul className="px-4 text-slate-800 mx-auto">
		  {requests.map(request => (
			<RequestCard key={request.trainer_id} request={request} />
		  ))}
		</ul>
	  </>
	);
  }
  
  export default RequestsForAthletes;

