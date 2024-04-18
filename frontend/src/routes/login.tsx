import axios from "axios";
import qs from "qs";
import { React, useState, useEffect } from "react";
import { Link, Navigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import { set } from "../state/userSlice";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';//GL


interface LoginFormProps {
  title: string; // Título del formulario
  registerLinkText: string; // Texto del enlace de registro
}

const LoginForm: React.FC<LoginFormProps> = ({ title, registerLinkText }) => {

	const loggedIn = useSelector(state => state.user.loggedIn);
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function submit(ev) {
		ev.preventDefault();

		const loginData = {
			"email": email,
			"password": password,
		};

		axios({
			method: "post",
			headers: {'content-type': 'application/x-www-form-urlencoded'},
			withCredentials: true,
			data: qs.stringify(loginData),
			url: "/api/login",
		}).then(res => {
			if ("data" in res === false)
				throw "unexpected response"

			const answer = res.data;
			if (answer.success) {
				dispatch(set({type: 'base', id: answer.userId, alias: answer.alias}))
			}
		}).catch(e => {
			console.log(e.response.data)
			if ('response' in e && 'data' in e.response) {
				toast(e.response.data.errorMessage);
			} else {
				toast("Hubo un problema");
			}
		});

	}

	function sessionLogin() {
		axios({
			method: "post",
			url: "/api/continue-login",
			withCredentials: true,
		}).then(res => {
			if ("data" in res === false)
				throw "unexpected response"
			const answer = res.data;
			console.log(answer)
			if (answer.success)
					dispatch(set({type: 'base', id: answer.userId, alias: answer.alias}))
		}).catch(e => {
			console.log(e);
		})
	}
	useEffect(sessionLogin, []);


    return (
      <div className="wrapper flex justify-center items-center p-10 h-screen"> 

	  <ToastContainer />

	  { loggedIn && (<Navigate to="/messages" />) }

        <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> 
          <h1 className="text-3xl md:text-5xl text-center font-semibold mb-8">{title}</h1> 
          
          <div className="mb-4">
            <input type="email" onInput={e => setEmail(e.target.value)} placeholder="Correo" className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
          </div>
          
          <div className="mb-4">
            <input type="password" onInput={e => setPassword(e.target.value)} placeholder="Contraseña" className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="text-white text-2xl bg-black py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Ingresar</button>
          </div>

          
          <div className="mt-4 text-center">
            <Link to="/register" className="text-azulote">{registerLinkText}</Link> 
          </div>
        </form>
      </div>
    );
  }

export default LoginForm;
