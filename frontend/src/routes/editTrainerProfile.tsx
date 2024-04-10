import axios from "axios";
import qs from "qs";
import {React, useEffect, useState} from "react";
//import {useSelector} from "react-redux";

export default function EditTrainerProfile() {
    //const userId = useSelector(state => state.user.id);

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
            console.log(ans)

            setAlias(ans.alias);
            setBirth(ans.birthday);
            setPhoto(ans.photo);
            setDesc(ans.description);
        }).catch(e => {
            console.log(e);
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
        <div >
        <h1>P O C</h1>

		<label htmlFor="alias">username: {alias}</label>
		<input type="text" id="alias" className="width-1/4"/>

		<label htmlFor="birth">Birthday: {birth}</label>
		<input type="date" id="birth" className="width-1/4" disabled/>

		<label htmlFor="photo">Photo: {photo}</label>
		<input type="text" id="photo" className="width-1/4" disabled/>

		<label htmlFor="desc">Description: {desc}</label>
		<input type="text" id="desc" className="width-1/4" disabled/>

		<button onClick={editUser} className="btn bg-amber-200">Update !</button>

        </ div>
    )
}
