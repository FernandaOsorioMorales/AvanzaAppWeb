import axios from "axios";
import { Field, Formik, Form } from 'formik';
import qs from "qs";
import React from 'react';
import {useEffect, useState} from 'react';
import {toast} from "react-toastify";

import ProtectedRoute from "../components/protectedRoute.tsx";
import Navbar from "../components/landingpage/navBar";

import corriendo from "../assets/corriendo.png";

export default function EditTrainerProfile() {

    useEffect(fetchUser, []);

	const [udata, setUdata] = useState({
		alias: "",
		birthDate: "",
		description: ""
	});

    function fetchUser() {
        axios({
            method: "get",
            url: "http://localhost:9090/user",
            withCredentials: true,
        }).then(res => {
            if ("data" in res === false)
                throw "unexpected response"
            const ans = res.data;
			console.log(ans);

			setUdata({
				alias: ans.alias,
				birthDate: ans.birthDate.split('T')[0],
				description: ans.description
			});
        }).catch(_ => {
			toast("Hubo un problema al recuperar tus datos");
        })
    }

	function editUser(values) {
		axios({
			method: "PATCH",
            url: "http://localhost:9090/user",
            withCredentials: true,
			headers: {"content-type": "application/x-www-form-urlencoded"},
			data: qs.stringify(values),
		}).then(_ => toast("Cambios guardados"))
		.catch(_ => {
			toast("Hubo un problema al actualizar tus datos");
		});
	}


	return (
	<>
		<ProtectedRoute />
		<Navbar />

        <div className="bg-blue-100 flex justify-start p-10 w-full">
            <div className="flex  pb-36 w-full">

			<Formik
			enableReinitialize
			initialValues={udata}
			onSubmit = {editUser}
			>
				<Form className="bg-blue-100 p-8 rounded-lg shadow-lg flex-1 w-full max-w-lg">

					<h1 className="text-5xl text-center mb-6 text-gray-600 font-bold tracking-wide">Edita tu perfil </h1>

					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Nombre: </label>
						<Field name="alias" type="text" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
					</div>

					<div className="mb-4">
						<label className="block text-xl text-gray-600 mb-2">Fecha de nacimiento: </label>
						<Field name="birthDate" type="date" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"/>

					</div>

                	<div className="mb-4">
                		<label className="block text-xl text-gray-600 mb-2" >Descripción: </label>
                		<Field name="description" type="text" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" />
                	</div>

                <div className="flex justify-center">
					<button type="submit" className="text-white text-2xl bg-gray-600 py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Guardar</button>
				</div>
				</Form>
			</Formik>

            <img src={corriendo} className="" />
			</ div>
		</div>
	</>

	);
}
