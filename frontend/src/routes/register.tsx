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
        <div>
            <form className="p-56" onSubmit={submitData}>
                <h1 className="text-5xl text-center">Regístrate</h1>

                <h2 className="text-2xl text-center text-white">Tu nombre</h2>
                <div className="input-box flex justify-center">
                    <input type= "text" onInput={e=>setName(e.target.value)} placeholder="Nombres"  />
                </div>

                <h2 className="text-2xl text-center text-white">Tu correo</h2>
                <div className="input-box flex justify-center">
                    <input type= "mail" onInput={e=>setEmail(e.target.value)} placeholder="Correo@example.com"  />
                </div>

                <h2 className="text-2xl text-center text-white">Tu número</h2>
                <div className="input-box flex justify-center">
                    <input type= "text" onInput={e=>setPhone(e.target.value)} placeholder="55 5555 5555"  />
                </div>

                <h2 className="text-2xl text-center text-white">Tu fecha de nacimiento</h2>
                <div className="input-box flex justify-center">
					<input type="date" onInput={e=>setBirthDate(e.target.value)}   />
                </div>

                <h2 className="text-2xl text-center text-white">Tu contraseña</h2>
                <div className="input-box flex justify-center">
					<input type="password" onInput={e=>setPassword(e.target.value)}    />
                </div>

                <div className="flex justify-center">
                <button type="submit" className="text-black text-1xl text-center bg-white p-2 rounded-sm">Registrar</button>
                </div>
                
            </form>
        </div>
    )
}
 export default RegisterForm;
