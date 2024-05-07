import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import qs from "qs";

import FirebaseImage from "../../utils/FirebaseImage.tsx";

function requestTraining(trainer_id: number) {
	const data = {
		trainer_id: trainer_id,
	};

	axios({
		method: "post",
		withCredentials: true,
		url: "/api/requestTraining",
		data: qs.stringify(data)
	}).then(_ => {
		toast("Listo !");
	}).catch(e => {
		let message = e?.data?.errorMessage;
		if (message) {
			toast(message);
		} else {
			toast("Hubo un problema");
		}
	});
}

function TrainerCard(trainer: {alias: string, description: string, id: number, photo: string, specialties: [string]}) {

	const tags = trainer.specialties.map(t => (<li key={t} value={t} className="badge badge-accent mx-2">{t}</li>));

	return (
	<div key={trainer.id} className="card bg-[#DC5663] my-2">
		<div className="card-body flex flex-row justify-between items-center p-3">
			<FirebaseImage className="rounded-full h-[10vh] w-[10vh]" image_name={trainer.photo} />
			<div>
				<h4 className="card-title text-blue-50">{trainer.alias}</h4>
				<p className="text-base">{trainer.description}</p>
				<div className="flex flex-row flex-wrap">{ tags }</div>
			</div>
			<div className="card-actions justify-end">
				<button className="btn btn-accent bg-blue-50" onClick={() => requestTraining(trainer.id)}>Solicitar</button>
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

function getAvailableTrainers() {
	axios({
		method: "get",
		withCredentials: true,
		url: "/api/trainers",
	}).then(res => {
		const data = res?.data;
		setTrainers(data);

		let specialties = data.flatMap(t => t.specialties);
		setTags([... new Set(specialties)]);
	}).catch()
}
	useEffect(getAvailableTrainers, []);

	const userId = useSelector(state => state.user.id)

	const cards = trainers
		.filter(t => tagFilter == "*" ? true: t.specialties.includes(tagFilter))
		.filter(t => t.description.includes(search) || t.alias.includes(search))
		.map(t => TrainerCard(t));
	
	const selectTags = tags.map(t => (<option key={t}>{t}</option>));

	return (
	<>
		<input type="text" value={search} onChange={e => setSearch(e.target.value)} className="input input-bordered w-full max-w-xs bg-[#E9F9FF] m-3" />

		<select className="select select-bordered w-full max-w-xs bg-blue-50 m-3" defaultValue="*" onChange={e => setTagFilter(e.target.value)}>
			<option value="*" >any</option>
			{ selectTags }
		</select>

		<ul className="flex flex-col my-2">
			{ cards }
		</ul>
	</>);
}
