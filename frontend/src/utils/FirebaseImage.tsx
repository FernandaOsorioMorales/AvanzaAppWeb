import React from "react";
import {useState, useEffect} from "react";

import {getImageUrl} from "./firebase-connection";

import defaultImage from "../assets/logo.png";

const FirebaseImage = ({image_name, className}) => {

	const [source, setSource] = useState("");
	const alt = `profile-pic:${image_name}`

	if (image_name != "") {
		getImageUrl(image_name)
			.then(setSource)
			.catch(_ => {});
	}

	if (source != "") {
		return (<img src={source} alt={alt} className={className}/>);
	} else {
		return (<img src={defaultImage} alt={alt} className={className}/>);
	}
 
}

export default FirebaseImage;
