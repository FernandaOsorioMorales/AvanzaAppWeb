import axios from "axios";
import qs from "qs";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type specialty = {id: number, name: string};

export default function ChooseSpecialties() {

	const [availableTags, setAvailableTags] = useState(new Map<number, specialty>());
	const [tagsSelected, setTagsSelected] = useState(new Set<number>());

	useEffect(fetchAvailableTags, []);
	useEffect(fetchSelectedTags, []);

	function fetchAvailableTags() {
		axios({
			method: "get",
			url: "/api/specialties",
			withCredentials: true
		}).then(r => {
			const tags = r?.data;
			for (let t of tags)
				availableTags.set(t.id, t);
			setAvailableTags(new Map(availableTags));
		}).catch(_ => toast("Hubo un error obteniendo las especialidades disponibles"));
	}

	function fetchSelectedTags() {
		axios({
			method: "get",
			url: "/api/specialties/selected",
			withCredentials: true
		}).then(r => {
			const selectedIds = r?.data.map( (t: specialty) => t.id);
			setTagsSelected(new Set(selectedIds))
		}).catch(_ => toast("Hubo un error obteniendo tus especialidades"));
	}

	function saveTags() {
		const tagsToSave = [...tagsSelected].map(id => availableTags.get(id));
		console.log(tagsSelected);
		console.log(tagsToSave);

		// Fiber doesn't seem able to handle lists in formvalues
		const data = {
			tags: JSON.stringify(tagsToSave),
		};

		axios({
			method: "post",
			url: "/api/specialties",
			withCredentials: true,
			data: qs.stringify(data)
		}).then(_ => toast("Especialidades guardadas")
		).catch(_ => toast("Hubo un problema"))
	}

	function toggleTag(tag: specialty) {
		if (tagsSelected.has(tag.id)) {
			tagsSelected.delete(tag.id);
		} else {
			tagsSelected.add(tag.id);
		}
		setTagsSelected(new Set(tagsSelected));
	}

	const tag_buttons = [...availableTags.values()]
		.map( (t: specialty) => {
			let style: string;
			if (tagsSelected.has(t.id))  {
				style = "btn-accent";
			} else {
				style = "btn-ghost";
			}

			return ( <li key={t.id}>
			<button className={`btn ${style}`} onClick={() => toggleTag(t)}>{t.name}</button>
			</li>)
		});

	return (<>
		<div className="mx-auto w-10/12 shadow-lg p-8">
			<h2 className="text-4xl text-center mb-6 text-gray-600 font-bold tracking-wide">Elige tus especialidades</h2>
			<ul className="flex justify-center" >
				{ tag_buttons }
			</ul>
			<button className="text-white text-2xl bg-gray-600 py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg" onClick={saveTags}>Guardar</button>
		</div>
	</>);
}
