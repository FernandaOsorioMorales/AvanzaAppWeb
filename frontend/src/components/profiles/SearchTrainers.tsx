import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";

function TrainerCard(trainer: {alias: string, description: string, id: number, photo: string, specialties: [string]}) {

	const tags = trainer.specialties.map(t => (<li key={t} value={t} className="badge badge-accent mx-2">{t}</li>));

	return (
	<div key={trainer.id} className="card bg-vainilla my-2">
		<div className="card-body">
			<h4 className="card-title">{trainer.alias}</h4>
			<p className="text-base">{trainer.description}</p>
			<div className="flex flex-row">{ tags }</div>
			<div className="card-actions justify-end">
				<button className="btn btn-accent" >Solicitar</button>
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
		url: "http://localhost:9090/trainers",
	}).then(res => {
		const data = res?.data;
		setTrainers(data);

		let specialties = data.flatMap(t => t.specialties);
		setTags([... new Set(specialties)]);
	}).catch()
}

	useEffect(getAvailableTrainers, []);

	const cards = trainers
		.filter(t => tagFilter == "*" ? true: t.specialties.includes(tagFilter))
		.filter(t => t.description.includes(search) || t.alias.includes(search))
		.map(t => TrainerCard(t));
	
	const selectTags = tags.map(t => (<option key={t}>{t}</option>));

	return (
	<>
		<input type="text" value={search} onChange={e => setSearch(e.target.value)} className="input input-bordered w-full max-w-xs bg-emerald-300" />

		<select className="select select-bordered w-full max-w-xs bg-amber-300" defaultValue="*" onChange={e => setTagFilter(e.target.value)}>
			<option value="*" >any</option>
			{ selectTags }
		</select>

		<ul className="flex flex-col my-2">
			{ cards }
		</ul>
	</>);
}
