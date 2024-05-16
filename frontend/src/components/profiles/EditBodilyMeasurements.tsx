import axios from "axios";
import { Field, Formik, Form } from 'formik';
import qs from "qs";
import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import FirebaseImage from "../../utils/FirebaseImage";
import {saveImage} from "../../utils/firebase-connection.ts";

type BodyMeasures = {
	height: number,
	weight: number,
	arms: number,
	waist: number,
	hips: number
};

export default function EditBodilyMeasurements() {
	const userId = useSelector(state => state.user.id);
	const [measures, setMeasures] = useState({
		height: 0,
		weight: 0,
		arms: 0,
		waist: 0,
		hips: 0
	});

	useEffect(fetchMeasurements, []);

	function fetchMeasurements() {
		axios({
			method: "get",
			withCredentials: true,
			url: "/api/measurements"
		}).then(res => {
			const data = res?.data;
			setMeasures(data);
		}).catch(_ => toast("Hubo un problema al recuperar tus medidas"));
	}

	function editMeasurements(values: BodyMeasures) {
		axios({
			method: "patch",
			withCredentials: true,
			url: "/api/measurements",
			data: qs.stringify(values),
		})
		.then(_ => toast("Medidas guardas"))
		.catch(_ => toast("Hubo un problema al guardar tus medidas"));
	}

	return (
	<>
            <div className="flex pb-36 w-10/12 mx-auto">

			<Formik
			enableReinitialize
			initialValues={measures}
			onSubmit = {editMeasurements}
			>
				<Form className="bg-blue-100 p-8 rounded-lg shadow-lg flex-grow">

					<h1 className="text-5xl text-center mb-6 text-gray-600 font-bold tracking-wide">Medidas</h1>

					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Altura (cm):</label>
						<Field name="height" type="number" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
					</div>
					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Peso (kg):</label>
						<Field name="weight" type="number" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
					</div>
					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Brazos (cm):</label>
						<Field name="arms" type="number" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
					</div>
					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Cintura (cm):</label>
						<Field name="waist" type="number" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
					</div>
					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Cadera (cm):</label>
						<Field name="hips" type="number" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
					</div>

                <div className="flex justify-center">
					<button type="submit" className="text-white text-2xl bg-gray-600 py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Guardar</button>
				</div>
				</Form>
			</Formik>

			</ div>
	</>

	);
}
