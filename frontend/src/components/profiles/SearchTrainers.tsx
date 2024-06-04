import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import qs from "qs";

import FirebaseImage from "../../utils/FirebaseImage.tsx";

function requestTraining(trainer_id) {
	const data = { trainer_id };
  
	axios.post("/api/requestTraining", qs.stringify(data), { withCredentials: true })
	  .then(() => {
		toast("¡Listo!");
	  })
	  .catch(e => {
		const message = e?.response?.data?.errorMessage || "Hubo un problema";
		toast(message);
	  });
  }
  
  
export function TrainerCard({ trainer }) {
	const { alias, description, id, photo, specialties } = trainer;
  
	return (
	  <div key={id} className="card bg-rose-700 my-4 shadow-lg rounded-lg overflow-hidden">
		<div className="card-body flex flex-col md:flex-row items-center p-6">
		  <FirebaseImage className="rounded-full h-24 w-24 md:h-32 md:w-32 object-cover" image_name={photo} />
		  <div className="md:ml-6 mt-4 md:mt-0 flex-1">
			<h4 className="text-white font-bold text-2xl mb-2">{alias}</h4>
			<p className="text-white text-base mb-4">{description}</p>
			<ul className="flex flex-wrap mb-4">
			  {specialties.map(t => (
				<li key={t} className="badge bg-white text-rose-700 mx-1 mb-1 px-2 py-1 rounded-full">{t}</li>
			  ))}
			</ul>
		  </div>
		  <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
			<button className="btn btn-accent bg-white text-rose-700 hover:bg-azulote hover:text-white transition-colors duration-300" onClick={() => requestTraining(id)}>
			  Solicitar
			</button>
		  </div>
		</div>
	  </div>
	);
  }
  
  
  
  export default function SearchTrainers() {
	const [search, setSearch] = useState("");
	const [trainers, setTrainers] = useState([]);
	const [tags, setTags] = useState([]);
	const [tagFilter, setTagFilter] = useState("*");
  
	useEffect(() => {
	  axios.get("/api/trainers", { withCredentials: true })
		.then(res => {
		  const data = res.data;
		  setTrainers(data);
		  const specialties = data.flatMap(t => t.specialties);
		  setTags([...new Set(specialties)]);
		})
		.catch(() => {
		  toast("Error al cargar entrenadores");
		});
	}, []);
  
	const filteredTrainers = trainers
	  .filter(t => tagFilter === "*" || t.specialties.includes(tagFilter))
	  .filter(t => t.description.includes(search) || t.alias.includes(search));
  
	return (
	  <div className="container mx-auto p-4">
		<div className="mb-4">
		  <input
			type="text"
			value={search}
			onChange={e => setSearch(e.target.value)}
			className="input input-bordered w-full max-w-md mx-auto p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 border-blue-300"
			placeholder="Busca por nombre"
		  />
		</div>
		<ul className="flex flex-col">
		  {filteredTrainers.map(trainer => (
			<TrainerCard key={trainer.id} trainer={trainer} />
		  ))}
		</ul>
	  </div>
	);
  }