import axios from "axios";
import qs from "qs";
import {React, useEffect, useState} from "react";
import {toast} from "react-toastify";

import ProtectedRoute from "../components/protectedRoute.tsx";
import Navbar from "../components/landingpage/navBar";

import corriendo from "../assets/corriendo.png";

export default function EditTrainerProfile() {

    const [alias, setAlias] = useState("");
    const [birth, setBirth] = useState("");
    const [photo, setPhoto] = useState("...");
    const [desc, setDesc] = useState("...");

    useEffect(fetchUser, []);

    function fetchUser() {
        axios({
            method: "get",
            url: "http://localhost:9090/user",
            withCredentials: true,
        }).then(res => {
            if ("data" in res === false)
                throw "unexpected response"
            const ans = res.data;

            setAlias(ans.alias);
            setBirth(ans.birthday);
            setPhoto(ans.photo);
            setDesc(ans.description);
        }).catch(e => {
            console.log(e);
			toast("Hubo un problema al recuperar tus datos");
        })
    }

	function editUser() {
		let inputAlias = (document.getElementById("alias") as HTMLInputElement).value;
		if (inputAlias == alias)
			return;

		axios({
			method: "PATCH",
            url: "http://localhost:9090/user",
            withCredentials: true,
			headers: {"content-type": "application/x-www-form-urlencoded"},
			data: qs.stringify({"field": "alias", "alias": inputAlias}),
		}).then(_ => {
			setAlias(inputAlias);
		}).catch(e => {
			console.log(e);
		});
	}

    return (
        <div>
            <div>
				<ProtectedRoute />
				<Navbar />
		    </div>
        <div className="bg-blue-100 flex justify-start p-10 w-full">
            <div className="flex  pb-36 w-full">
            <form onSubmit={editUser} className="bg-blue-100 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-5xl text-center mb-6 text-gray-600 font-bold tracking-wide">Edita tu perfil </h1>

                <div className="mb-4">
                    <label className="block text-xl text-gray-600 mb-2">Nombre: {alias}</label>
                    <input type="text" id="alias" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" placeholder="Tu nombre"/>
                </div>
                
                
                <div className="mb-4">
                    <label className="block text-xl text-gray-600 mb-2" htmlFor="birth">Birthday: {birth}</label>
                    <input type="date" id="birth" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="mb-4">
                    <label className="block text-xl text-gray-600 mb-2" htmlFor="photo">Foto: {photo}</label>
                    <input type="text" id="photo" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" placeholder="Tu foto"/>
                </div>
                
                <div className="mb-4">
                <label className="block text-xl text-gray-600 mb-2" htmlFor="desc">Descripción: {desc}</label>
                <input type="text" id="desc" className="w-full py-2 px-4 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500" placeholder="Tu descripción"/>
                </div>

                <div className="flex justify-center">
					<button type="submit" className="text-white text-2xl bg-gray-600 py-2 px-6 rounded-md focus:outline-none hover:bg-blue-700 hover:shadow-lg">Guardar</button>
				</div>
            
            </form>
            <img src={corriendo} />

        </ div>

        </div>
        </div>
        
    )
}
