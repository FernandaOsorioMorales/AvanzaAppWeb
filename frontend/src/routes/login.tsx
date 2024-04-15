import axios from "axios";
import qs from "qs";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate} from "react-router-dom";
import { toast } from "react-toastify";
import {useSelector, useDispatch} from "react-redux";

import Navbar from "../components/landingpage/navBar";
import espalda from "../assets/espalda.png";

import {first_login, continue_login} from "../utils/login";


interface LoginFormProps {
  title: string; // Título del formulario
  registerLinkText: string; // Texto del enlace de registro
}

const LoginForm: React.FC<LoginFormProps> = ({ title, registerLinkText }) => {

	const loggedIn = useSelector(state => state.user.loggedIn);
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function autoLogin() {
		//attempts a login with the cookies present,
		//there is no need to show an error to the user if failed
		continue_login().catch(console.log);
	}

	function manualLogin(eve) {
		eve.preventDefault();
		first_login(email, password).catch(e => {
			toast("Datos de acceso invalidos");
		});
	}

	useEffect(autoLogin, []);

    return (
		<div className="">
			<div>
				<Navbar />
			</div>
			<div className="bg-blue-100 flex justify-start p-10 w-full">

				{ loggedIn && (<Navigate to="/messages" />) }			
				<div className="flex p-12 pb-36 w-full">
				<form onSubmit={manualLogin} className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-md">
		  			<h1 className="text-3xl md:text-5xl text-center text-gray-600 font-semibold mb-8">{title}</h1>
	  
		  			<div className="mb-4">
						<input type="email" onInput={e => setEmail(e.target.value)} placeholder="Correo" className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
		  			</div>
	  
		  			<div className="mb-4">
						<input type="password" onInput={e => setPassword(e.target.value)} placeholder="Contraseña" className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
		  			</div>
	  
		  			<div className="flex justify-center">
						<button type="submit" className="text-white text-2xl bg-gray-600 py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Ingresar</button>
		  			</div>
	  
		  			<div className="mt-4 text-center">
						<Link to="/register" className="text-gray-600">{registerLinkText}</Link>
		  			</div>
				</form>

				<img src={espalda} alt="espalda" className="w-25 h-25" ></img>
				</div>
	  		</div>
		</div>
		
    );
  }

export default LoginForm;
