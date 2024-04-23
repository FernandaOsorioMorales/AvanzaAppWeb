import React from "react";
import {useState} from "react";
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { toast } from "react-toastify";

import Navbar from "../components/landingpage/navBar";
import { register } from "../utils/login.ts";

import pesas3 from "../assets/pesas3.png";

const RegisterUser : React.FC =() =>{
	const loggedIn = useSelector(state => state.user.loggedIn)

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [password, setPassword] = useState("");

	function submitData(ev) {
		ev.preventDefault();

		register({
			"alias": name,
			"email": email,
			"phone": phone,
			"birthDate": birthDate,
			"password": password,
			"kind": "athlete"
		}).catch(e => {
			const message = e?.response?.data;
			if (message)
				toast(message);
			else
				toast("Hubo un problema");
		});
	}

    return(
	<div>
		<div>
				<Navbar />
		</div>
		<div className=" bg-blue-100 flex justify-start p-10 w-full">


			{ loggedIn && (<Navigate to="/userProfile" />) }
			<div className="flex  pb-36 w-full">
			<form className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={submitData}>
				<h1 className="text-5xl text-center mb-6 text-gray-600 font-bold tracking-wide">¡Te estábamos esperando!</h1>

				<div className="mb-4">
					<label className="block text-xl text-gray-600 mb-2">Tu nombre</label>
					<input type="text" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setName(e.target.value)} placeholder="Nombres" />
				</div>

				<div className="mb-4">
					<label className="block text-xl text-gray-600 mb-2">Tu correo</label>
					<input type="email" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setEmail(e.target.value)} placeholder="Correo@example.com" />
				</div>

				<div className="mb-4">
					<label className="block text-xl text-gray-600 mb-2">Tu número</label>
					<input type="text" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setPhone(e.target.value)} placeholder="55 5555 5555" />
				</div>

				<div className="mb-4">
					<label className="block text-xl text-gray-600 mb-2">Tu fecha de nacimiento</label>
					<input type="date" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setBirthDate(e.target.value)} />
				</div>

				<div className="mb-4">
					<label className="block text-xl text-gray-600 mb-2">Tu contraseña</label>
					<input type="password" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setPassword(e.target.value)} />
				</div>

				<div className="flex justify-center">
					<button type="submit" className="text-white text-2xl bg-gray-600 py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Registrar</button>
				</div>
			</form>
			<div className="avatar flex items-center">
  				<div className="w-30 rounded">
    				<img src={pesas3} />
  				</div>
			</div>
			</div>
		</div>
	</div>
        
    )
}
 export default RegisterUser;
