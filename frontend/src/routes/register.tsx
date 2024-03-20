import {React, useState} from "react";
import axios from "axios";
import qs from 'qs';

const RegisterForm : React.FC =() =>{
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [password, setPassword] = useState("");

	function submitData(ev) {
		ev.preventDefault();

		const registerData = {
			"alias": name,
			"email": email,
			"phone": phone,
			"birthDate": birthDate,
			"password": password,
		};

		axios({
			method: "post",
			headers: {'content-type': 'application/x-www-form-urlencoded'},
			withCredentials: true,
			data: qs.stringify(registerData),
			url: "http://localhost:9090/register",
		})
			.then(r => console.log(r))
			.catch(e => {
				if ('response' in e)
					console.log(e.response.data);
			});
	}

    return(
        <div className="flex justify-center items-center p-10 h-screen">
  <form className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md" onSubmit={submitData}>
    <h1 className="text-5xl text-center mb-6 text-black font-bold tracking-wide">Regístrate</h1>

    <div className="mb-4">
      <label className="block text-xl text-black mb-2">Tu nombre</label>
      <input type="text" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setName(e.target.value)} placeholder="Nombres" />
    </div>

    <div className="mb-4">
      <label className="block text-xl text-black mb-2">Tu correo</label>
      <input type="email" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setEmail(e.target.value)} placeholder="Correo@example.com" />
    </div>

    <div className="mb-4">
      <label className="block text-xl text-black mb-2">Tu número</label>
      <input type="text" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setPhone(e.target.value)} placeholder="55 5555 5555" />
    </div>

    <div className="mb-4">
      <label className="block text-xl text-black mb-2">Tu fecha de nacimiento</label>
      <input type="date" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setBirthDate(e.target.value)} />
    </div>

    <div className="mb-4">
      <label className="block text-xl text-black mb-2">Tu contraseña</label>
      <input type="password" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" onInput={e => setPassword(e.target.value)} />
    </div>

    <div className="flex justify-center">
    <button type="submit" className="text-white text-2xl bg-black py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Registrar</button>

    </div>
  </form>
</div>
    )
}
 export default RegisterForm;
