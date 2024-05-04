import axios from "axios";
import { Field, Formik, Form } from 'formik';
import qs from "qs";
import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import ProtectedRoute from "../components/protectedRoute.tsx";
import Navbar from "../components/landingpage/navBar";
import FirebaseImage from "../utils/FirebaseImage";
import {saveImage} from "../utils/firebase-connection.ts";

export default function EditTrainerProfile() {

	const userId = useSelector(state => state.user.id);
    useEffect(fetchUser, []);

	const [udata, setUdata] = useState({
		alias: "",
		birthDate: "",
		description: "",
		photo: "",
	});

	// necessary to reload images even though their paths haven't changed
	const [changeCount, setChangeCount] = useState(0);

    function fetchUser() {
        axios({
            method: "get",
            url: "/api/user",
            withCredentials: true,
        }).then(res => {
            if ("data" in res === false)
                throw "unexpected response"
            const ans = res.data;

			setUdata({
				alias: ans.alias,
				birthDate: ans.birthDate.split('T')[0],
				description: ans.description,
				photo: ans.photo
			});
			setChangeCount(changeCount + 1);
        }).catch(_ => {
			toast("Hubo un problema al recuperar tus datos");
        })
    }

	function editUser(values) {
		axios({
			method: "patch",
            url: "/api/user",
            withCredentials: true,
			headers: {"content-type": "application/x-www-form-urlencoded"},
			data: qs.stringify(values),
		}).then(_ => toast("Cambios guardados"))
		.catch(_ => {
			toast("Hubo un problema al actualizar tus datos");
		});
	}

	function changeProfilePicApi(values: {photo: string}) {
		axios({
			method: "patch",
			url: "/api/user/photo",
			withCredentials: true,
			headers: {"content-type": "application/x-www-form-urlencoded"},
			data: qs.stringify(values),
		}).then(_ => toast("Imagen cambiada"))
		.catch(_ => toast("Hubo un problema para guardar la imagen"));
	}

	function changeProfilePic(event) {
		//Note: Though the photo name doesn't change that doesn't mean
		//that we can do without the request to backend, since we use the field to
		//tell that we should pull an image instead of the default one
		const file_input = event.target;
		const file = file_input.files[0];
		const image_name = `profile-${userId}`;
		saveImage(file, image_name)
			.then(_ => {
				let d = udata;
				d.photo = image_name;
				setUdata(d);
				setChangeCount(changeCount + 1);
			})
			.then(() => changeProfilePicApi(udata))
			.then(_ => toast("Se actualizó imagen de perfil"))
			.catch(_ => toast("Hubo un problema para cambiar tu foto"));
	}

	return (
	<>
		<ProtectedRoute />
		<Navbar />

        <div className="bg-blue-100 p-10 w-full">
            <div className="flex pb-36 w-10/12 mx-auto">

			<Formik
			enableReinitialize
			initialValues={udata}
			onSubmit = {editUser}
			>
				<Form className="bg-blue-100 p-8 rounded-lg shadow-lg flex-grow">

					<h1 className="text-5xl text-center mb-6 text-gray-600 font-bold tracking-wide">Edita tu perfil </h1>

					<FirebaseImage image_name={udata.photo} className="mx-8 w-64 h-64 rounded-full overflow-hidden " key={changeCount}/>

					<div className="mb-4">
						<input type="file" onChange={changeProfilePic} id="profile-upload" accept="image/*" className="hidden"/>
						<button type="button" onClick={() => {document.getElementById('profile-upload')?.click()}} className="btn btn-primary">Cambiar foto</button>
					</div>

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

			</ div>
		</div>
	</>

	);
}
